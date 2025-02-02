export const ProgressBar = ({ value }) => (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );