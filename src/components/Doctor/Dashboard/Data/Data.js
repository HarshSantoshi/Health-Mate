import { Person, CurrencyRupee,Home,Article,BarChart,AccountCircle,Chat} from '@mui/icons-material';

//Cards Data
export const cardsData = [
    {
        title: "PatientCure",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "970",
        png: Person
    },
    {
        title: "Earnings",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "$14,270",
        png: CurrencyRupee
    },
    {
        title: "Chats",
        color: {
            backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "78",
        png: Chat
    },
];

export const UpdatesData = [
    {
        img: 'profile.png',
        name: "Harsh",
        noti: "Great Service 👌. Prompt Diagnosis of the disease.",
        time: "25 seconds ago",
    },
    {
        img: 'profile.png',
        name: "Abhinav",
        noti: "Great Service 👌. Prompt Diagnosis of the disease.",
        time: "30 minutes ago",
    },
    {
        img: 'profile.png',
        name: "Raumil",
        noti: "Great Service 👌. Prompt Diagnosis of the disease.",
        time: "2 hours ago",
    },
];

export const SidebarData = [
    {
      icon: Home,
      heading: "Dashboard",
    },
    {
      icon: Article,
      heading: "Appointments",
    },
    {
      icon: Person,
      heading: "Patients",
    },
    {
      icon: AccountCircle,
      heading: 'Profile'
    },
    {
      icon: BarChart,
      heading: 'Analytics'
    },
  ];