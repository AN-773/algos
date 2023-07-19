export default abstract class Algorithm<FrameType, DataType> {
  abstract start(userData: DataType): FrameType[]
}