# Camera App với React Native và Expo

Ứng dụng camera hoàn chỉnh với các tính năng:
- Chụp ảnh và quay video
- Chọn ảnh/video từ thư viện
- Upload lên Cloudinary
- Nén ảnh trước khi upload
- Giao diện đẹp và thân thiện

## Cài đặt và Chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Cấu hình Cloudinary:
   - Tạo tài khoản tại [Cloudinary](https://cloudinary.com)
   - Tạo một "unsigned upload preset"
   - Cập nhật thông tin trong file `components/MediaPreview.tsx`:
   ```typescript
   const CLOUD_NAME = 'your-cloud-name'; // Thay thế bằng cloud name của bạn
   const UPLOAD_PRESET = 'your-upload-preset'; // Thay thế bằng upload preset của bạn
   ```

3. Chạy ứng dụng:
```bash
npm start
```

## Cấu trúc Dự án

```
components/
├── CameraPermission.tsx    # Component yêu cầu quyền camera
├── CameraComponent.tsx     # Component camera chính với các điều khiển
├── MediaPreview.tsx        # Component preview và upload
└── MediaSelection.tsx       # Component chọn phương thức

app/
└── camera.tsx              # Màn hình chính tích hợp tất cả
```

## Tính năng

### 1. Yêu cầu Quyền Camera
- Hiển thị trạng thái quyền (đã cấp, đã từ chối, chưa xác định)
- Nút yêu cầu quyền với loading state

### 2. Chọn Phương thức
- Nút "Chụp ảnh": Mở camera để chụp ảnh/quay video
- Nút "Chọn từ Thư viện": Chọn ảnh/video từ thư viện thiết bị

### 3. Camera Component
- Chụp ảnh và quay video
- Chuyển đổi giữa camera trước/sau
- Điều khiển flash (on/off/auto)
- Chuyển đổi giữa chế độ ảnh/video
- Giao diện đẹp với các nút điều khiển

### 4. Preview và Upload
- Hiển thị ảnh/video đã chụp
- Nút "Chụp lại" để quay về camera
- Nút "Tiếp tục" để upload lên Cloudinary
- Loading state khi upload
- Nén ảnh trước khi upload để giảm thời gian

### 5. Upload Cloudinary
- Upload ảnh và video lên Cloudinary
- Sử dụng FormData và axios
- Xử lý lỗi và thông báo thành công/thất bại

## Cấu hình Cloudinary

1. Đăng ký tài khoản tại [Cloudinary](https://cloudinary.com)
2. Tạo một "unsigned upload preset":
   - Vào Settings > Upload
   - Tạo preset mới với quyền "Unsigned"
   - Lưu preset name để sử dụng trong code

3. Cập nhật code:
```typescript
const CLOUD_NAME = 'your-cloud-name';
const UPLOAD_PRESET = 'your-upload-preset';
```

## Quyền Cần thiết

Ứng dụng cần các quyền sau (đã được cấu hình trong `app.json`):
- Camera permission
- Microphone permission (cho video)
- Photos permission (cho thư viện ảnh)

## Dependencies

- `expo-camera`: Camera và quay video
- `expo-image-picker`: Chọn ảnh từ thư viện
- `expo-av`: Phát video
- `expo-image-manipulator`: Nén ảnh
- `axios`: Upload lên Cloudinary
- `@expo/vector-icons`: Icons

## Lưu ý

- Cần thiết bị thật để test camera (không hoạt động trên simulator)
- Đảm bảo có kết nối internet để upload lên Cloudinary
- Cấu hình đúng Cloudinary credentials trước khi sử dụng
