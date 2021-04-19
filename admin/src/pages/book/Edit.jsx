import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BookForm from 'components/BookForm';
import api from 'api';

const Edit = () => {

  const { id } = useParams()

  const [initialBook, setInitialBook] = useState();

  useEffect(() => {
    (async () => {
      const { data: book } = await api.getBookById(id);
      book && setInitialBook(book)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (book) => {
    await api.editBook(id, book);
  }

  return (
    <BookForm initialBook={initialBook} onSubmit={handleSubmit} />
  )
}

export default Edit;
