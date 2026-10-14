
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LayoutDashboard,
  Files,
  Upload,
  Folder,
  Users,
  Activity,
  Trash2,
  Settings,
  Search,
  Bell,
  FileText,
  File,
  CloudUpload,
  Menu,
} from 'lucide-react'

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Documents', icon: Files },
  { label: 'Upload Document', icon: Upload },
  { label: 'Categories', icon: Folder },
  { label: 'Users', icon: Users },
  { label: 'Activity Logs', icon: Activity },
  { label: 'Trash', icon: Trash2 },
  { label: 'Settings', icon: Settings },
]

const sampleDocuments = [
  {
    name: 'Laporan Kegiatan',
    category: 'Laporan',
    type: 'PDF',
    date: '14 Okt 2026',
    color: 'text-red-600',
  },
  {
    name: 'Proposal Program',
    category: 'Proposal',
    type: 'DOCX',
    date: '13 Okt 2026',
    color: 'text-blue-600',
  },
  {
    name: 'Surat Administrasi',
    category: 'Surat',
    type: 'PDF',
    date: '12 Okt 2026',
    color: 'text-red-600',
  },
]

function App() {
  const [activeMenu, setActiveMenu] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [apiStatus, setApiStatus] = useState('Memeriksa server...')
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    axios
      .get('/api/health')
      .then((response) => {
        setApiStatus(response.data.message)
      })
      .catch(() => {
        setApiStatus('Backend belum terhubung')
      })
  }, [])

  const documents = sampleDocuments.filter((doc) =>
    `${doc.name} ${doc.category} ${doc.type}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {mobileMenu && (
        <button
          aria-label="Tutup menu"
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col
          border-r border-slate-200 bg-white transition-transform
          md:static md:translate-x-0
          ${mobileMenu ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-20 items-center gap-3 border-b px-6">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <Files size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900">DocuSpace</h1>
            <p className="text-xs text-slate-500">Document Management</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase
            tracking-wider text-slate-400">
            Workspace
          </p>

          {menuItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setActiveMenu(label)
                setMobileMenu(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl
                px-3 py-3 text-left text-sm transition
                ${
                  activeMenu === label
                    ? 'bg-blue-50 font-semibold text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <div className="m-4 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold">Penyimpanan Dokumen</p>
          <p className="mt-1 text-xs text-slate-500">
            File akan disimpan di Google Drive.
          </p>
          <div className="mt-3 h-2 rounded-full bg-slate-200">
            <div className="h-2 w-1/4 rounded-full bg-blue-600" />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Tampilan demo
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-20 items-center
          justify-between gap-3 border-b border-slate-200
          bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Buka menu"
              onClick={() => setMobileMenu(true)}
              className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {activeMenu}
              </h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Document Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden items-center gap-2 rounded-xl
              border border-slate-200 px-3 sm:flex">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari dokumen..."
                className="w-36 bg-transparent py-2 text-sm outline-none
                  lg:w-52"
              />
            </label>
            <button
              aria-label="Notifikasi"
              className="rounded-xl border border-slate-200 p-2.5
                text-slate-600 hover:bg-slate-50"
            >
              <Bell size={19} />
            </button>
            <div className="flex h-10 w-10 items-center justify-center
              rounded-full bg-blue-100 font-bold text-blue-700">
              A
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          {activeMenu === 'Dashboard' ? (
            <>
              <div className="mb-7">
                <p className="text-sm text-slate-500">
                  Ringkasan pengelolaan dokumen
                </p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Dashboard
                </h3>
              </div>

              <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: 'Total Dokumen', value: '3', icon: Files,
                    color: 'bg-blue-50 text-blue-600' },
                  { title: 'Total PDF', value: '2', icon: FileText,
                    color: 'bg-red-50 text-red-600' },
                  { title: 'Total Word', value: '1', icon: File,
                    color: 'bg-indigo-50 text-indigo-600' },
                  { title: 'Total User', value: '—', icon: Users,
                    color: 'bg-emerald-50 text-emerald-600' },
                ].map(({ title, value, icon: Icon, color }) => (
                  <div key={title} className="rounded-2xl border
                    border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-xl p-3 ${color}`}>
                        <Icon size={22} />
                      </span>
                      <span className="text-xs text-slate-400">
                        Demo
                      </span>
                    </div>
                    <p className="mt-5 text-sm text-slate-500">{title}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-8 rounded-2xl bg-blue-700 p-6
                text-white sm:p-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row
                  sm:items-center">
                  <div>
                    <p className="text-sm text-blue-100">
                      Document Management System
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                      Semua dokumen dalam satu tempat.
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-blue-100">
                      Kelola, cari, dan akses dokumen dengan lebih mudah.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveMenu('Upload Document')}
                    className="flex shrink-0 items-center justify-center
                      gap-2 rounded-xl bg-white px-5 py-3 font-semibold
                      text-blue-700 hover:bg-blue-50"
                  >
                    <CloudUpload size={19} />
                    Upload Dokumen
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border
                border-slate-200 bg-white">
                <div className="flex flex-wrap items-center justify-between
                  gap-3 border-b border-slate-200 p-5">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Dokumen Terbaru
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Contoh data untuk tampilan awal
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveMenu('Documents')}
                    className="text-sm font-semibold text-blue-700
                      hover:underline"
                  >
                    Lihat semua
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-5 py-4 font-medium">Dokumen</th>
                        <th className="px-5 py-4 font-medium">Kategori</th>
                        <th className="px-5 py-4 font-medium">Tipe</th>
                        <th className="px-5 py-4 font-medium">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {documents.map((doc) => (
                        <tr key={doc.name} className="hover:bg-slate-50">
                          <td className="px-5 py-4 font-medium text-slate-800">
                            {doc.name}
                          </td>
                          <td className="px-5 py-4 text-slate-600">
                            {doc.category}
                          </td>
                          <td className={`px-5 py-4 font-semibold ${doc.color}`}>
                            {doc.type}
                          </td>
                          <td className="px-5 py-4 text-slate-500">
                            {doc.date}
                          </td>
                        </tr>
                      ))}
                      {documents.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-5 py-8 text-center
                            text-slate-500">
                            Dokumen tidak ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-500">
                Status backend: {apiStatus}. Data dokumen saat ini masih demo.
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200
              bg-white p-8 sm:p-12">
              <div className="mx-auto max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center
                  justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Files size={28} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {activeMenu}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Halaman ini akan kita bangun pada tahap berikutnya.
                  Untuk saat ini, kamu sudah bisa mencoba navigasi sidebar.
                </p>
                <button
                  onClick={() => setActiveMenu('Dashboard')}
                  className="mt-6 rounded-xl bg-blue-600 px-5 py-3
                    text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Kembali ke Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
