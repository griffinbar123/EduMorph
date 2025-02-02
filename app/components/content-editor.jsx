// components/ContentEditor.js
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { AddQuestion } from './add-question';
import SequenceQuestionEditor from './sequence-question-editor';
import MatchingQuestionEditor from './matching-question-editor';

export default function ContentEditor({ aiContent, onSave }) {
  const [editedContent, setEditedContent] = useState(aiContent);
  const [activeIndex, setActiveIndex] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false)

  const handleChange = (index, field, value) => {
    setHasUnsavedChanges(true)
    const updated = [...editedContent];
    updated[index][field] = value;
    setEditedContent(updated);
  };

  const handleRegenerate = (index, field, value) => {
    setHasUnsavedChanges(true)
    const updated = [...editedContent];
    updated[index][field] = value;
    setEditedContent(updated);
  };

  const handleDelete = (index, field, value) => {
    setHasUnsavedChanges(true)
    const updated = [...editedContent];
    updated[index][field] = value;
    setEditedContent(updated);
  };

  // Warn users about unsaved changes
useEffect(() => {  
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <div className="space-y-4 text-slate-600">
      {editedContent.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">Question {index + 1}</h3>
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="text-indigo-600 hover:text-indigo-700"
            >
              {activeIndex === index ? 'Collapse' : 'Edit'}
            </button>
          </div>

          {/* Preview Mode */}
          {activeIndex !== index && (
            <div className="space-y-2">
              <p className="font-medium">{item.question}</p>
              {item.answer && (
                <p className="text-gray-600">{item.answer}</p>
              )}
              {item.options && (
                <ul className="list-disc pl-4">
                  {item.options.map((opt, i) => (
                    <li key={i} className={i === item.correctIndex ? 'text-green-600' : ''}>
                      {opt}
                    </li>
                  ))}
                </ul>
              )}

            {item.correctOrder && (
                <ol className="list-decimal pl-4">
                  {item.correctOrder.map((orderIndex, i) => (
                    <li key={i}>
                      {item.items[orderIndex]}
                    </li>
                  ))}
                </ol>
              )}

            {item.guidelines && (
              <>
              <span className='font-semibold'>Guidelines</span>
                <ul className="list-disc pl-4">
                  {item.guidelines.map((guideline, i) => (
                    <li key={i}>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </>
              )}

              {item.pairs && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Prompts</h4>
                      {item.pairs.map((pair, index) => (
                        <div
                          key={`prompt-${pair.id}`}
                          className="p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-600">{index + 1}.</span>
                          <span className="ml-2">{pair.prompt}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Answers</h4>
                      {item.pairs.map((pair, index) => (
                        <div
                          key={`answer-${pair.id}`}
                          className="p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <span className="text-gray-600">{index + 1}.</span>
                          <span className="ml-2">{pair.answer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
        
                  {item.pairs.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      No matching pairs created yet
                    </div>
                  )}
                  </div>
                )}

            </div>
          )}
          

          {/* Edit Mode */}
          {activeIndex === index && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <input
                  value={item.question}
                  onChange={(e) => handleChange(index, 'question', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              {item.type === 'flashcard' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Answer</label>
                  <textarea
                    value={item.answer}
                    onChange={(e) => handleChange(index, 'answer', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}

            {item.type === 'sequence' && (
                <SequenceQuestionEditor
                  content={item}
                  onUpdate={(updatedContent) => {
                    // Update your state here
                   handleChange(index, 'items', updatedContent.items);
                   handleChange(index, 'correctOrder', updatedContent.correctOrder);
                  }}
                />
              )}

              {item.type === 'matching' && (
                <MatchingQuestionEditor 
                  content={item}
                  onUpdate={(updatedContent) => {
                    // Update your state here
                    handleChange(index, 'pairs', updatedContent.pairs);
                  }}
                />
              )}

              {item.options && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Options</label>
                  {item.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={i === item.correctIndex}
                        onChange={() => handleChange(index, 'correctIndex', i)}
                      />
                      <input
                        value={opt}
                        onChange={(e) => {
                          const newOptions = [...item.options];
                          newOptions[i] = e.target.value;
                          handleChange(index, 'options', newOptions);
                        }}
                        className="p-2 border rounded flex-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
            <div className="flex gap-2 mt-2">
            <button
                onClick={() => handleRegenerate(index)}
                className="text-sm bg-gray-100 px-2 py-1 rounded flex items-center gap-1"
            >
                <FontAwesomeIcon icon={faMagicWandSparkles} className="w-4 h-4 text-purple-600" />
                Regenerate with AI
            </button>
            <button
                onClick={() => handleDelete(index)}
                className="text-sm bg-red-100 px-2 py-1 rounded text-red-600"
            >
                Delete
            </button>
            </div>
        </div>
      ))}
    <AddQuestion isOpen={showAddQuestion} setIsOpen={setShowAddQuestion} onAdd={() => (console.log("adding"))}/>
      
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => onSave(editedContent)}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}