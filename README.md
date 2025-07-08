# @sho/schema

Zodを使用したスキーマ定義ライブラリです。求人情報のスクレイピングとデータ処理に特化したスキーマを提供します。

## 概要

このライブラリは、求人情報の生データ（raw data）から構造化されたデータ（parsed data）への変換を行うためのZodスキーマを提供します。

## プロジェクト構造

```
src/
├── index.ts                 # メインエントリーポイント
├── schema/
│   ├── index.ts            # スキーマのエクスポート
│   ├── headless-crawler/   # ヘッドレスクローラー関連スキーマ
│   │   ├── index.ts
│   │   ├── raw.ts          # 生データ用スキーマ
│   │   └── parsed.ts       # 変換済みデータ用スキーマ
│   └── job-store/          # 求人情報ストア関連スキーマ
│       ├── index.ts
│       ├── jobFetch.ts     # 求人情報取得スキーマ
│       ├── jobInsert.ts    # 求人情報挿入スキーマ
│       └── jobList.ts      # 求人情報一覧スキーマ
└── type/                   # TypeScript型定義
    └── scraper-type.ts
```

## 主要なスキーマ

### Raw Data Schemas (`src/schema/headless-crawler/raw.ts`)

生データ（スクレイピング結果）用のスキーマ：

- `JobNumberSchema`: 求人番号（例: "12345-67890"）
- `CompanyNameSchema`: 会社名
- `OccupationSchema`: 職種
- `EmploymentTypeSchema`: 雇用形態（正社員、パート労働者など）
- `RawReceivedDateShema`: 受付日（"2024年1月1日"形式）
- `RawExpiryDateSchema`: 有効期限（"2024年1月1日"形式）
- `RawWageSchema`: 給与（"100,000円〜150,000円"形式）
- `RawWorkingHoursSchema`: 勤務時間（"9時00分〜18時00分"形式）
- `RawEmployeeCountSchema`: 従業員数
- `JobInfoSchema`: 求人情報の統合スキーマ

### Parsed Data Schemas (`src/schema/headless-crawler/parsed.ts`)

変換済みデータ用のスキーマ：

- `ParsedReceivedDateSchema`: ISO 8601形式の受付日
- `ParsedExpiryDateSchema`: ISO 8601形式の有効期限
- `ParsedWageSchema`: 給与の上限・下限（数値）
- `ParsedWorkingHoursSchema`: 勤務開始・終了時間
- `ParsedEmploymentCountSchema`: 従業員数（数値）
- `JobSchema`: 完全な求人情報スキーマ
- `JobSchemaForUI`: UI表示用の求人情報スキーマ

### Job Store Schemas (`src/schema/job-store/`)

求人情報の操作用スキーマ：

- `JobInsertBodySchema`: 求人情報挿入用スキーマ
- `JobInsertSuccessResponseSchema`: 挿入成功レスポンススキーマ
- `JobFetchSchema`: 求人情報取得用スキーマ
- `JobListSchema`: 求人情報一覧用スキーマ

## 使用方法

### インストール

```bash
npm install @sho/schema
# または
pnpm add @sho/schema
```

### 基本的な使用例

```typescript
import { JobInfoSchema, JobSchema } from '@sho/schema';

// 生データの検証
const rawJobData = {
  jobNumber: "12345-67890",
  companyName: "株式会社サンプル",
  receivedDate: "2024年1月1日",
  expiryDate: "2024年12月31日",
  occupation: "エンジニア",
  employmentType: "正社員",
  wage: "300,000円〜500,000円",
  workingHours: "9時00分〜18時00分",
  employeeCount: "100名",
  homePage: "https://example.com"
};

const validatedData = JobInfoSchema.parse(rawJobData);
```

## 開発

### セットアップ

```bash
pnpm install
```

### ビルド

```bash
pnpm build
```

### 型チェック

```bash
pnpm type-check
```

### 検証（ビルド + 実行）

```bash
pnpm verify
```

## トラブルシューティング

### 循環インポート問題

**問題：**
```
TypeError: Cannot read properties of undefined (reading 'omit')
```

**原因：**
循環インポート（circular dependency）が発生していました：

1. `parsed.ts` → `jobInsert.ts`の`JobInsertBodySchema`をインポート
2. `jobInsert.ts` → `parsed.ts`の`JobInfoSchema`をインポート
3. `parsed.ts`で`JobSchema`が`JobInsertBodySchema`を使用

**解決策：**
- `parsed.ts`から`JobInsertBodySchema`のインポートを削除
- `JobSchema`と`JobSchemaForUI`の定義を`JobInfoSchema`を直接使用するように修正
- 循環インポートを解消

**修正前：**
```typescript
// parsed.ts
import { JobInsertBodySchema } from "../job-store";

export const JobSchema = JobInsertBodySchema.extend({
  // ...
});
```

**修正後：**
```typescript
// parsed.ts
import { JobInfoSchema } from "./raw";

export const JobSchema = JobInfoSchema.omit({
  // ...
}).extend({
  // ...
});
```

## 技術スタック

- **TypeScript**: 型安全性の確保
- **Zod**: スキーマ検証ライブラリ
- **tsup**: TypeScriptバンドラー
- **Playwright**: テスト（開発依存関係）

## ライセンス

このプロジェクトのライセンス情報については、プロジェクトのルートディレクトリを確認してください。 