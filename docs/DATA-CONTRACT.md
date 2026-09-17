# 数据字段约定

## 词条

```json
{
  "id": "word_001",
  "word": "incorporate",
  "phonetic": "/ɪnˈkɔːpəreɪt/",
  "pos": "v.",
  "meaning": "包含；纳入；合并",
  "book": "考点词",
  "group": 12,
  "audioUrl": "https://example.com/audio/incorporate.mp3",
  "lastPracticedAt": "2026-09-14T10:00:00Z",
  "wrongCount": 1
}
```

`book` 可选值：`考点词`、`答案词`、`话题词`。

## 考点词扩展字段

```json
{
  "synonyms": [{ "word": "include", "meaning": "包含", "audioUrl": "" }],
  "sourceText": "The plan incorporates several ideas.",
  "matchedText": "The plan includes several ideas.",
  "translation": "该计划包含了几个想法。"
}
```

## 答案词/话题词扩展字段

```json
{
  "example": "Please confirm your reservation.",
  "exampleTranslation": "请确认你的预订。"
}
```

## 学习记录

```json
{
  "userId": "user_001",
  "wordId": "word_001",
  "mode": "practice",
  "isCorrect": false,
  "practicedAt": "2026-09-14T10:00:00Z"
}
```

`mode` 可选值：`practice`、`quick`、`review`。
