import React from 'react';
import BookForm from 'components/BookForm';
import api from 'api';

function Add() {
  const handleSubmit = async (book) => {
    await api.addBook(book);
  };

  return <BookForm onSubmit={handleSubmit} />;
}

export default Add;
