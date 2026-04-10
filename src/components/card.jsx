const Card = ({ titulo, children }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md border border-[#53720a]/10
                hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      {titulo && (
        <h3 className="text-[#53720a] font-semibold">
        {titulo}
      </h3>
      )}
      <div className="text-[#C97C8C] font-bold text-lg">
        {children}
      </div>
    </div>
  )

}

export default Card;