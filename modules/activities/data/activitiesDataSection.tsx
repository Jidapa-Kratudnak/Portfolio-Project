import { ActivitiesDataType } from "../type/activitiesDataType";

export const activitiesData: ActivitiesDataType[] = [
  {
    activityName: "Career-Ready English Skills Workshop on Job Applications",
    activityDescription: "อบรมด้านตลาดงาน IT, การจัดทำ Resume, LinkedIn, การสมัครงาน และการสัมภาษณ์งาน",
    activityImage: ["/images/imageTest.jpeg", "/images/imageTest.jpeg"],
    activityStartDate: new Date("2024-11-4"),
    activityEndDate: new Date("2024-11-06"),
  },
  {
    activityName: "พี่สอนน้อง(สหกิจศึกษา)",
    activityDescription: "แบ่งปันความรู้พื้นฐานเรื่องการทำงานของ Cookie, Session Management และแนวทางการตั้งค่าความปลอดภัยของเว็บไซต์",
    activityImage: ["/images/imageTest.jpeg"],
    activityStartDate: new Date("2026-02-14"),
    activityEndDate: null,
  },
];