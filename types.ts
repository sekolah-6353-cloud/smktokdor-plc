export interface ReportData {
  programTitle: string;
  organizer: string;
  date: string;
  time: string;
  venue: string;
  participants: string;
  focus: string;
  objectives: string;
  plcStrategy: string;
  findings: string;
  images: string[];
}

export const PLC_STRATEGIES = [
  "Learning Walk",
  "Peer Coaching",
  "Lesson Study",
  "Teacher Sharing Session",
  "Video Critique",
  "Book Club",
  "Data Analysis",
  "Lain-lain"
];
