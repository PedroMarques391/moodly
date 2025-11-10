interface IRegister {
  id: string;
  emoji: string;
  feeling: string;
  description: string;
  date: Date;
}

export const registers: IRegister[] = [
  {
    id: "1",
    emoji: "😊",
    feeling: "Happy",
    description: "Had a great day!",
    date: new Date("2024-06-01"),
  },
  {
    id: "2",
    emoji: "😔",
    feeling: "Sad",
    description: "Feeling a bit down.",
    date: new Date("2024-06-02"),
  },
  {
    id: "3",
    emoji: "😡",
    feeling: "Angry",
    description: "Got frustrated with work.",
    date: new Date("2024-06-03"),
  },
];
