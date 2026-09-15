import { User, RekapNilaiMurid } from '../types';

export interface StudentCSVRecord {
  id: string;
  username: string;
  role: string;
  name: string;
  nip: string;
  email?: string;
  status: 'Aktif' | 'Nonaktif';
  avatar?: string;
}

export const RAW_USERS_CSV_DATA: StudentCSVRecord[] = [
  {
    id: 'usr-admin-1',
    username: 'admin',
    role: 'ADMIN',
    name: 'I Ketut Agus Nova Anggarawan, S.Pd., Gr.',
    nip: '198811152022211012',
    email: 'i5123@guru.sma.belajar.id',
    status: 'Aktif',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-guru-1',
    username: 'guru',
    role: 'GURU',
    name: 'I Ketut Agus Nova Anggarawan, S.Pd., Gr.',
    nip: '198811152022211013',
    email: 'i5123@guru.sma.belajar.id',
    status: 'Aktif',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-guru-2',
    username: 'ratna',
    role: 'GURU',
    name: 'Ratna Sartika, S.Pd.',
    nip: '19901020 201502 2 004',
    email: 'ratna.pjok@sman1olahraga.sch.id',
    status: 'Aktif',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
  },
  {
    id: 'usr-guru-3',
    username: 'haryono',
    role: 'GURU',
    name: 'Haryono, S.Pd.Jas',
    nip: '19820512 200801 1 015',
    email: 'haryono.pjok@sman1olahraga.sch.id',
    status: 'Aktif',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
  },
];

export const DEFAULT_USERS: User[] = RAW_USERS_CSV_DATA.map((r) => {
  const isMurid = r.role.toLowerCase().includes('murid') || (!r.role.includes('ADMIN') && !r.role.includes('GURU'));
  const isGuru = r.role === 'GURU';
  const isAdmin = r.role === 'ADMIN';

  const user: User = {
    id: r.id,
    username: r.username,
    role: isAdmin ? 'ADMIN' : isGuru ? 'GURU' : 'MURID',
    name: r.name,
    email: r.email || (isMurid ? `${r.username}@siswa.sman1olahraga.sch.id` : `${r.username}@guru.sma.belajar.id`),
    status: r.status,
    avatar: r.avatar,
  };

  if (isAdmin || isGuru) {
    user.nip = r.nip;
    if (isGuru) {
      if (r.username === 'ratna') {
        user.mataPelajaran = 'PJOK Kelas X (Fase E)';
        user.kelasDiampuIds = ['cls-x-1', 'cls-x-2', 'cls-x-3', 'cls-x-4'];
        user.kelasDiampu = ['X 1', 'X 2', 'X 3', 'X 4'];
      } else if (r.username === 'haryono') {
        user.mataPelajaran = 'PJOK Kelas XII (Fase F)';
        user.kelasDiampuIds = ['cls-xii-1', 'cls-xii-2', 'cls-xii-3', 'cls-xii-4'];
        user.kelasDiampu = ['XII 1', 'XII 2', 'XII 3', 'XII 4'];
      } else {
        user.mataPelajaran = 'PJOK Kelas XI (Fase F)';
        user.kelasDiampuIds = ['cls-xi-1', 'cls-xi-2', 'cls-xi-3', 'cls-xi-4', 'cls-xi-5', 'cls-xi-6', 'cls-xi-7'];
        user.kelasDiampu = ['XI 1', 'XI 2', 'XI 3', 'XI 4', 'XI 5', 'XI 6', 'XI 7'];
      }
    }
  } else {
    user.nis = r.nip;
    user.nip = r.nip;
    user.tahunPelajaran = '2026/2027';
  }

  return user;
});

// Rekap Nilai Kosong secara default (akan diisi manual atau diupload)
export const DEFAULT_NILAI: RekapNilaiMurid[] = [];
