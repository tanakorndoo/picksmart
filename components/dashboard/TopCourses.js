"use client";

const courses = [
  {
    id: 1,
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Chen",
    students: 340,
    rating: 4.9,
    progress: 92,
  },
  {
    id: 2,
    title: "Full-Stack Web Development",
    instructor: "James Park",
    students: 520,
    rating: 4.8,
    progress: 85,
  },
  {
    id: 3,
    title: "Data Science with Python",
    instructor: "Maria Lopez",
    students: 280,
    rating: 4.7,
    progress: 78,
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    instructor: "Alex Rivera",
    students: 190,
    rating: 4.6,
    progress: 71,
  },
  {
    id: 5,
    title: "Mobile App Development",
    instructor: "David Kim",
    students: 310,
    rating: 4.5,
    progress: 68,
  },
];

export default function TopCourses() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-slate-900">Top Courses</h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200 cursor-pointer">
          See all
        </button>
      </div>
      <div className="space-y-4">
        {courses.map((course, idx) => (
          <div
            key={course.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-indigo-500">{idx + 1}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-900 truncate">{course.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{course.instructor} · {course.students} students</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-8">{course.progress}%</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-slate-600">{course.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
