import BorrowedBooks from '../model/BorrowedBook.mjs';
import Member from '../model/Member.mjs';
import Book from '../model/Book.mjs';

const getAllBorrowedBooks = async (req, res) => {
    try {
        const borrowings = await BorrowedBooks.find()
            .populate('memberId', 'name code')
            .populate('bookId', 'title author');
        res.json(borrowings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const searchBorrowedBooks = async (req, res) => {
    try {
        const { memberId, bookId } = req.query;
        
        const query = {};
        if (memberId) {
            query.memberId = memberId;
        }
        if (bookId) {
            query.bookId = bookId;
        }
        
        const borrowings = await BorrowedBooks.find(query)
            .populate('memberId', 'name code')
            .populate('bookId', 'title author');
        
        res.json(borrowings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getBorrowedBookById = async (req, res) => {
    try {
        const borrowing = await BorrowedBooks.findById(req.params.id)
            .populate('memberId', 'name code')
            .populate('bookId', 'title author');
        if (!borrowing) {
            return res.status(404).json({ message: 'Borrowed book not found' });
        }
        res.json(borrowing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const borrowBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    if (member.penaltyEndDate && member.penaltyEndDate > new Date()) {
      return res.status(400).json({ message: 'Member is under penalty. Cannot borrow books' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.stock === 0) {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }

    const currentDate = new Date();
    const finalReturnDate = new Date(currentDate);
    finalReturnDate.setDate(currentDate.getDate() + 7);

    const returnDate = new Date(finalReturnDate);

    const borrowing = new BorrowedBooks({
      memberId,
      bookId,
      finalReturnDate, 
      returnDate 
    });

    book.stock--;

    await borrowing.save();
    await book.save();

    const populatedBorrowing = await BorrowedBooks.findById(borrowing._id)
      .populate('memberId', 'name code')
      .populate('bookId', 'title author');

    res.status(201).json(populatedBorrowing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const returnBorrowedBook = async (req, res) => {
  try {
    const borrowing = await BorrowedBooks.findById(req.params.id);
    if (!borrowing) {
      return res.status(404).json({ message: 'Borrowed book not found' });
    }

    if (borrowing.returned) {
      return res.status(400).json({ message: 'Book has already been returned' });
    }

    borrowing.returnDate = req.body.returnDate;

    borrowing.returned = true;

    await borrowing.save();

    const currentDate = new Date();
    if (borrowing.returnDate > borrowing.finalReturnDate) {
      const member = await Member.findById(borrowing.memberId);
      if (member) {
        const returnDate = new Date(borrowing.returnDate); 
        returnDate.setDate(returnDate.getDate() + 3);
        member.penaltyEndDate = returnDate; 

        await member.save();
    
        const updatedMember = await Member.findById(borrowing.memberId);
    
        res.json({ borrowing, updatedMember });
      }
    } else {
      res.json(borrowing);
    }

    const book = await Book.findById(borrowing.bookId);
    if (book) {
      book.stock++;
      await book.save();
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getAllBorrowedBooks, searchBorrowedBooks, getBorrowedBookById, borrowBook, returnBorrowedBook };
