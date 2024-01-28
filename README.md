# Kalkulembu

## Apa Itu Kalkulembu?
Kalkulembu adalah sebuah aplikasi Android yang dapat digunakan untuk _monitoring_ sapi di peternakan.

## Fitur-Fitur

### Monitoring Sapi
- Melihat data sapi di tiap peternakan:
  - Banyak sapi
  - Nama sapi
  - Foto sapi
  - Bobot sapi
  - Kondisi kesehatan sapi
  - Jenis kelamin sapi
- Melihat grafik pertumbuhan setiap sapi melalui bobot badannya.

### Kamera dan Galeri
- Mengambil foto sapi menggunakan kamera _smartphone_.
- Memilih usia dari sapi yang diambil fotonya.
- Mengunggah foto sapi yang baru saja diambil atau melalui galeri foto.

### Manajemen Akun dan Profil Pengguna
- Log in/log out akun pengguna
- Mengedit data profil pengguna: foto profil, nama, nomor telepon
- Berganti ke peternakan lain yang dimiliki pengguna

## Lain-Lain:
- Jenis rilis: _Preview_
- Tanggal rilis: 17 November 2023 (aplikasi di-_build_ kembali untuk keperluan dokumentasi pada tanggal 28 Januari 2024)
- Versi: 1.0.0 (versi Capstone Expo)
- Platform: Android

## Tech Stack
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

Backend:
- [Repo GitHub](https://github.com/Capstone-B-14/kalkulembu-be-main)
- [Vercel](https://kalkulembu-be-main.vercel.app/)

## Menjalankan Aplikasi
### _User account credentials_
Karena limitasi aplikasi saat Capstone Expo, pengguna hanya dapat masuk ke dua akun _placeholder_:
- Akun peternak
  - Email: farmer@example.com
  - Password: 12345678
- Akun admin
  - Email: admin@example.com
  - Password: 12345678

### Menggunakan _smartphone_ atau _emulator_ Android
1. Buka tab [Releases](https://github.com/Capstone-B-14/kalkulembu-mobile-fe/releases)
2. Unduh file kalkulembu.apk
3. Jika perlu, nyalakan pengaturan "Install unknown apps" di _smartphone_ maupun _emulator_ Android yang digunakan.
4. Jika perlu, [matikan Play Protect](https://support.google.com/googleplay/answer/2812853?hl=en) untuk sementara.
5. _Install_ file .apk
6. Jalankan aplikasi seperti biasa

### Menjalankan _Local Development Server_ dengan Expo Go
_Prerequisites_:
- Node.js + npm [(Tutorial)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
- Expo di komputer Anda [(Tutorial)](https://docs.expo.dev/get-started/installation/)
- Expo Go di _smartphone_ Anda (Android - [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US)) / (iOS - [App Store](https://apps.apple.com/us/app/expo-go/id982107779))

Langkah-langkah:
1. _Clone_ repository ini ke komputer lokal Anda.
2. Buka terminal di folder _root_ dari hasil _clone_ di komputer Anda, kemudian jalankan ```npm install``` dan ```npx expo install```
3. Setelah langkah 2 selesai, jalankan ```npx expo start```
4. Kode QR akan muncul di terminal. Hal ini berarti _dev server_ lokal di komputer Anda telah berjalan. 
   Tekan "s" pada keyboard untuk berganti mode antara Expo Go/_development build_ sesuai dengan kebutuhan Anda. Sebagai alternatif, Anda dapat menambahkan _flag_ ```--go``` atau ```--dev-client``` di langkah 3 untuk memilih mode Expo Go/_development build_ dari awal.

   ![image](https://github.com/Capstone-B-14/kalkulembu-mobile-fe/assets/70407002/48e2b3b4-def1-4f21-974f-86915c2f9784)
6. Pindai kode QR di terminal dengan _smartphone_ Anda. Anda akan dialihkan ke aplikasi Expo Go.
7. Jika menggunakan _emulator_, tekan "a" pada keyboard untuk membuka aplikasi di _emulator_ Android Anda.
8. Aplikasi akan terbuka.

## _Troubleshooting_
#### Apakah aplikasi ini tidak dapat dijalankan di komputer Anda?
Biasanya, masalah ini disebabkan oleh _package_ yang belum ter-_install_ ataupun belum ter-_update_. Jalankan ```npm install``` dan ```npx expo install``` di terminal Anda untuk meng-_install_ dan meng-_update_ aplikasi.
#### Apakah Anda hanya melihat layar putih di _smartphone_ Anda?
Kemungkinan besar terdapat masalah di koneksi Anda, sehingga _smartphone_ atau _emulator_ Anda tidak dapat terhubung ke _development server_. Anda dapat mencoba menggunakan _tunneling_ untuk menjalankan _development server_ Anda. Masalah ini juga kami hadapi selama proses pengembangan aplikasi untuk Capstone Expo, dan kadang terjadi, baik itu karena menggunakan Wi-Fi publik, menggunakan _firewall_, maupun karena pengaturan _emulator_ yang kurang tepat.

Ikuti langkah-langkah di dokumentasi Expo: [Tunneling di Expo CLI](https://docs.expo.dev/more/expo-cli/#tunneling) atau lihat langkah-langkah berikut:
- Install package @expo/ngrok dengan _command_ ```npm i -g @expo/ngrok```
- Jalankan _development server_ melalui URL _tunnel_ dengan _command_ ```npx expo start --tunnel```
Sesuai dengan dokumentasi Expo, _tunneling_ lebih lambat daripada _dev server_ lokal. Akan tetapi, menggunakan _tunneling_ dapat memitigasi masalah koneksi yang mungkin Anda hadapi.
