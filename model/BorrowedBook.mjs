import mongoose from 'mongoose';

const borrowedBooksSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now
  },
  finalReturnDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  returned: {
    type: Boolean,
    default: false
  }
});

const BorrowedBooks = mongoose.model('BorrowedBook', borrowedBooksSchema);

export default BorrowedBooks;