# AkademiPort

AkademiPort, okul sınavı/proje teslimi için hazırlanmış web tabanlı okul yönetim sistemi demosudur. Kullanıcı girişi, yeni hesap oluşturma, admin paneli, duyuru yönetimi, ders programı, sınav takvimi, kullanıcı talepleri ve gece modu içerir.

## Demo hesaplar

- Admin: `admin@okul.test` / `Admin123`
- Kullanıcı: `ogrenci@okul.test` / `Ogrenci123`
- Veli: `veli@okul.test` / `Veli123`

## Yeni hesap açma

Giriş ekranındaki `Yeni Hesap Oluştur` düğmesiyle istediğiniz e-posta ve şifreyle kullanıcı hesabı açabilirsiniz. Oluşturulan hesaplar aynı tarayıcıda kayıtlı kalır ve tekrar girişte kullanılabilir.

## Gece modu

Üst menüdeki `Gece Modu` veya `Gündüz Modu` düğmesiyle temayı istediğiniz zaman değiştirebilirsiniz. Seçilen tema aynı tarayıcıda kayıtlı kalır.

## Öğretmenler ve iletişim

Üst menüde `Öğretmenler` sayfasında öğretmen kadrosu görünür. Admin panelindeki `Öğretmenler` sekmesinden öğretmen eklenebilir, düzenlenebilir ve silinebilir.

`İletişim` sayfasındaki mesaj formu admin panelindeki talepler bölümüne kayıt oluşturur.
Admin panelindeki `İletişim` sekmesinden okul adı, adres, telefon, e-posta ve çalışma saatleri düzenlenebilir.

## Çalıştırma

Yerel link ile çalıştırmak için:

```powershell
node server.js
```

Node çalışmazsa Windows PowerShell ile:

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

Sonra bu adrese gidin:

```text
http://127.0.0.1:4173
```
