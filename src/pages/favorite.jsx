import BookList from '@/components/book-list';
import Empty from '@/components/empty';
import { getAllFavorites } from '@/services/favorites';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

export default function Favorite() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    _fetchData();
  }, []);

  const _fetchData = async () => {
    try {
      const response = await getAllFavorites();
      setBooks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="bg-slate-100 min-h-screen p-8 max-w-[720px] mx-auto">
      <section className="space-y-4">
        <header className="flex items-center gap-4 justify-between">
          <div className="">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs hover:underline"
            >
              <FaChevronLeft /> Kembali
            </Link>
            <div className="mt-4">
              <h1 className="text-3xl font-bold">Favorit Kamu</h1>
              <p className="mt-1">Semua buku favorit kamu, ada di sini.</p>
            </div>
          </div>
        </header>
      </section>

      <section>
        {!books.length ? (
          <Empty text="Belum ada buku yang kamu cari nih, yuk mulai cari." />
        ) : (
          <BookList
            books={books}
            refetch={_fetchData}
            // refetch={() => setBooks(getAllFavorites())}
          />
        )}
      </section>
    </main>
  );
}
