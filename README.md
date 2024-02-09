# car-service-app

Bu proje, React Native Expo kullanarak bir mobil uygulama geliştirmek ve bu uygulama için bir backend servisi sağlamak amacıyla Go, Docker ve PostgreSQL kullanmaktadır.

## Başlarken

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler

- Node.js ve npm
- Expo CLI
- Go
- Docker
- PostgreSQL

### Kurulum

1. **Mobil Uygulama**

```bash
cd car-service-client/
npm install
npm start
```
- Yukarıdaki komutları kullanarak client tarafını ayağa kaldırabilirsiniz. Eğer isterseniz npx expo run:ios komutu ile ios cihazlarda ya da npx expo run:andorid komutu ile de android cihazlarda uygulamayı ayağa kaldırabilirsiniz.

```bash
cd car-service-client/
npm install
npx expo run:ios
npx expo run:android
```
- Bu noktada cihanızın işletim sistemine göre xCode ile ios emulatoründen veya Androidstudio ile android emulatorlerinden faydalanabilirsiniz.
- Farklı bir deneyim olarak ise mobil cihazlarınıza ExpoGo uygulamasını yükleyerek projenin konsolunda çıkan QR kodu okutup uygulamayı mobil cihazınızda da deneyeimleyebilirsiniz.

2. **Backend Servisi**

```bash
cd car-service-server/
docker-compose up -d
go run ./cmd/api
```
- Yukarıda yazılan komutlar uygulamadaki sistemleri ayağa kaldıracak ve backend sisteminin hizmete başlamasını sağlayacaktır.
- Eğer istenirse backend routeları postman uygulaması ile de kullanılabilir.
- - GET /allAppointments
  - GET /admin/allUsers //uygulamanın güvenliği için JWT kullanılmıştır. Bu route için admin girişi gerekmektedir
  - POST /authenticate
  - POST /createUser
## Kullanım

Mobil uygulamayı Expo CLI kullanarak çalıştırabilir ve backend servisine istekler yapabilirsiniz. Backend servisi varsayılan olarak `localhost:8080` adresinde çalışır.

## Katkıda Bulunma

1. Bu projeyi fork ve klonlayın.
2. Yeni özellikler ekleyin veya hataları düzeltin.
3. Değişikliklerinizi göndermek için bir pull request oluşturun.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına başvurun.

## İletişim

Eğer herhangi bir sorunuz veya geri bildiriminiz varsa
