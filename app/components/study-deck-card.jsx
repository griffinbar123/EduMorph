// components/StudyDeckCard.js
import Link from 'next/link';
import { ProgressBar } from './progress-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandSparkles, faClock, faShare, faBookOpen, faPencilSquare } from '@fortawesome/free-solid-svg-icons';




export const StudyDeckCard = ({ 
  id,
  title,
  progress = 0,
  tags = [],
  questionCount = 0,
  lastAccessed,
  aiGenerated = true
}) => {

  return (


    
    <Link href={`/deck/${id}`} className='' passHref legacyBehavior>
      <div className=" relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 cursor-pointer">
        {/* Card Content */}
        <div className="p-6  flex flex-col">
          
          {/* Header Section */}
          <div className='grow-0'>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 pr-4 truncate">
                {title}
              </h3>
              {aiGenerated && (
                <FontAwesomeIcon icon={faWandSparkles} className="w-5 h-5 text-purple-500 flex-shrink-0" />
              )}
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Mastery Progress</span>
                <span className="font-medium text-indigo-600">
                  {Math.round(progress)}%
                </span>
              </div>
              <ProgressBar value={progress} />
            </div>
          </div>

          {/* Footer Section */}
          <div className='flex h-full grow-1 flex-col '>
            {/* Metadata */}
            <div className="flex grow-0 items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
                <span>{questionCount} questions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                <span>
                  {lastAccessed ? 
                    new Date(lastAccessed).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    }) : 
                    'New'
                  }
                </span>
              </div>
            </div>

            {/* Tags & Actions */}
            <div className="flex h-full  grow-1 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2.5 py-1 bg-indigo-50 text-indigo-800 text-xs font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle edit action
                  }}
                >
                  <FontAwesomeIcon icon={faPencilSquare} className="w-5 h-5" />
                </button>
                <button
                  className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-600"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle quick study action
                  }}
                >
                  <FontAwesomeIcon icon={faShare} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-indigo-100 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
      </div>
    </Link>
  );
};
