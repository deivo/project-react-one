export default interface Lesson {
  id: string,
  order: number,
  title: string,
  video: string,
  poster: string,
  url: string,
  price: string,
  category: string,
}

interface LessonResult {
  data: Lesson,
  success: boolean
}

export {
  Lesson,
  LessonResult
}