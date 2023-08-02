import BookList from '@/components/book-list';
import Empty from '@/components/empty';
import SearchBar from '@/components/search-bar';
import { useDebounce } from '@/hooks/use-debounce';
import axios from 'axios';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      _fetchBooks(debouncedSearch);
    } else {
      setBooks([]);
    }
  }, [debouncedSearch]);

  const _fetchBooks = useCallback(
    async (query) => {
      try {
        const response = await axios.get(`/api/search`, {
          params: { q: query },
        });
        setBooks(
          response.data.data.map((b) => ({
            title: b.volumeInfo.title,
            authors: b.volumeInfo.authors,
            id: b.id,
            averageRating: b.averageRating || 0,
            thumbnail: b?.volumeInfo.imageLinks?.thumbnail || '',
          }))
        );
      } catch (err) {
        setBooks([]);
        console.log(err.message || 'Kesalahan sistem');
      }
    },
    [debouncedSearch]
  );

  return (
    <main className="bg-slate-100 min-h-screen p-8 max-w-[720px] mx-auto">
      <section className="space-y-4">
        <header className="flex items-center gap-4 justify-between">
          <div>
            <h1 className="text-3xl font-bold">CariBuku</h1>
            <p className="mt-1">Cari dan simpan buku favoritmu di sini!</p>
          </div>
          <Link
            href="/favorite"
            title="Favorite Books"
            className="text-red-500"
          >
            <FaHeart size="20" />
          </Link>
        </header>
        <SearchBar value={search} setValue={setSearch} />
      </section>

      <section>
        {!books.length ? (
          <Empty text="Belum ada buku yang kamu cari nih, yuk mulai cari." />
        ) : (
          <BookList books={books} />
        )}
      </section>
    </main>
  );
}
