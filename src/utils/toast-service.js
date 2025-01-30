export const showSuccessAdd = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menambahkan!', life: 2000 });
};

export const showSuccessEdit = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil mengubah!', life: 2000 });
};

export const showSuccessRemove = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menghapus!', life: 2000 });
};

export const showSuccessRegister = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil mendaftarkan akun, silakan masuk!', life: 2000 });
};

export const showSuccessResetPassword = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menyetel ulang kata sandi!', life: 2000 });
};

export const showSuccessSendOtp = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil mengirim ulang kode OTP!', life: 2000 });
};

export const showSuccessApproved = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menyetujui barang yang disewakan!', life: 2000 });
};

export const showSuccessReject = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menolak barang yang disewakan!', life: 2000 });
};

export const showSuccessFinish = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menyelesaikan penyewaan!', life: 2000 });
};

export const showSuccessCancel = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil membatalkan barang yang disewa!', life: 2000 });
};

export const showErrorStock = (toast) => {
  toast.add({ severity: 'error', summary: 'Gagal', detail: 'Status tidak boleh tersedia jika stok adalah 0', life: 3000 });
};

export const showErrorOtp = (toast) => {
  toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal memverifikasi email Anda. Mohon coba kembali!', life: 3000 });
};

export const showSuccessRental = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil melakukan penyewaan!', life: 2000 });
};

export const showSuccessAddCart = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menambah ke keranjang!', life: 1000 });
};

export const showSuccessAddTrx = (toast) => {
  toast.add({ severity: 'success', summary: 'Sukses', detail: 'Berhasil menambah transaksi secara manual!', life: 2000 });
};