#  Ticket-System（票務系統）－前端
## 專案名稱
Movie GO
## 專案介紹
Movie GO 是一個全方位電影票務平台，一站式瀏覽並購買所有戲院線上進行的活動與套票、查看其他使用者對該活動／套票的評論。怕一個人看電影很孤單，可以直接在平台上建立活動，揪團一起看電影。如果臨時有事，能直接在平台上將已購買的票券轉售。
## 專案團隊

| 開發人員 | 負責開發範圍 |
| -------- | -------------------------------------- |
| Jules     | 前端開發 |
| Muchuanhung    | 前端開發 |
| Johnnim    | 前端開發 |
| Jennychiang   | 前端開發 |
| Roger Li    | 後端開發 |
| YJ    | 後端開發 |

## 安裝本專案
- Node.js 版本必需為 v21
1. 取得專案
   ```
   git clone  https://github.com/muchuanhung/ticket-system-frontend.git
   ```
2. 移動到專案中
   ```
   cd ticket-system-frontend
   ```
3. 安裝套件
   ```
   npm install
   ```
4. 建立 `.env.local` 內容並新增以下內容
   ```
   NEXTAUTH_URL="http://localhost:3000/"
   NEXTAUTH_SECRET="RUG8MjKLqooQUdNyfYWTCAnpgBENOEZgiAgpMle7LhU=" // 此為隨機產生亂碼，非專案上線 SECRET
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
5. 運行專案
   ```
   npm run dev
   ```
6. 開啟專案
   在瀏覽器中前往 `http://localhost:3000` 後，輸入對應身份組的帳號密碼即可查看

## 資料夾說明
| 資料夾/檔案 | 說明 |
| --- | --- |
| `src/app` | 根據身份組（路由）去開不同的資料夾，內有此專案主要的功能核心 |
| `src/assets` | 圖片、svg 等放置於此 |
| `src/components` | 此資料夾中含有共用的頁面配置、元件 |
| `src/hooks` | 此資料夾中放置共用的 React custom hooks |
| `src/pages` | 路由在此資料夾設定 |
| `src/services` | 像後端取得資料的 api 在此資料夾設定 |
| `src/stores` | 於此資料夾中設定全域共用的狀態管理 |
| `src/styles` | 全域的樣式檔 |
| `src/types` | TypeScript 的型別統一於此設定 |
| `src/utils` | 全域共用的函式會放在此資料夾中 |
| `src/lib` | server side 使用的函式會放在此資料夾中 |

## 專案使用技術
- Node.js: v21
- Next.js: v14.1
- TypeScript: v5
- React hook form: v7
- TailwindCSS: v3.4.3
- ESlint: v8
- storybook: v8.0.9
