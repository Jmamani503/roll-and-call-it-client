interface Props {
  title: string
  message: string
}
export const GameNotification = ({ title, message }: Props) => {
  return (
    <div className="text-white">
      <h3 className="text-2xl font-bold text-center text-[#2fc4b1]">{title}</h3>
      <p className='pt-6 max-w-xs text-center'>{message}</p>
    </div>
  )
}
