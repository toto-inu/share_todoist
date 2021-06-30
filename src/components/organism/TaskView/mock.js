export const todoTasks = [
  // 表示前に親要素の後に子要素が来るように並べ替えが必要
  // 以下は並べ替え済み
  {
    id: 1,
    doneFlag: false,
    content: "読みたい本",
    layer: 1,
    childIds: [2, 3, 4],
  },
  {
    id: 2,
    doneFlag: false,
    content: "フリーランスの税金と領収書",
    layer: 2,
    childIds: [],
  },
  {
    id: 3,
    doneFlag: false,
    content: "決算書の読み方",
    layer: 2,
    childIds: [],
  },
  {
    id: 4,
    doneFlag: false,
    content: "WEBアプリのマーケティング",
    layer: 2,
    childIds: [5, 6],
  },
  {
    id: 5,
    doneFlag: false,
    content: "マーケ本1",
    layer: 3,
    childIds: [],
  },
  {
    id: 6,
    doneFlag: false,
    content: "マーケ本2",
    layer: 3,
    childIds: [],
  },
  {
    id: 7,
    doneFlag: false,
    content: "個人開発のためにマーケ本を探す",
    layer: 1,
    childIds: [],
  },
];
