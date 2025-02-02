import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import MatchingQuestionEditor from './matching-question-editor';
import MultipleChoiceEditor from './multi-choice-editor';

function ManualForm({title, setTitle, setManualQuestions, manualQuestions}) {

    const addNewQuestion = (type = 'flashcard') => {
        setManualQuestions([...manualQuestions, {
          id: Date.now(),
          type,
          question: '',
          answer: '',
          options: type === 'mcq' ? ['', ''] : [],
          pairs: []
        }]);
      };
    
      const updateQuestion = (id, field, value) => {
        setManualQuestions(manualQuestions.map(q => 
          q.id === id ? { ...q, [field]: value } : q
        ));
      };
    
      const removeQuestion = (id) => {
        setManualQuestions(manualQuestions.filter(q => q.id !== id));
      };
    
      const handleQuestionTypeChange = (id, newType) => {
        setManualQuestions(manualQuestions.map(q => {
          if (q.id === id) {
            return {
              ...q,
              type: newType,
              options: newType === 'mcq' ? ['', ''] : []
            };
          }
          return q;
        }));
      };

  return (
    <>
        <div>
        <label className="block text-sm font-medium mb-2">Deck Title</label>
        <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value )}
            className="w-full p-3 border rounded-lg"
        />
        </div>

    <div className="space-y-6">
        <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Study Items</h3>
            <button
            type="button"
            onClick={() => addNewQuestion()}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
            Add Item
            </button>
        </div>

        {manualQuestions.map((question, index) => (
            <div key={question.id} className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-3">
                  <select
                  value={question.type}
                  onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}
                  className="bg-white px-3 py-1 rounded border text-sm"
                  >
                  <option value="flashcard">Flashcard</option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="sa">Short Answer</option>
                  <option value="matching">Matching</option>
                  </select>
                  <button
                  type="button"
                  onClick={() => removeQuestion(question.id)}
                  className="text-red-500 hover:text-red-700"
                  >
                  <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                  </button>
              </div>

              <div className="space-y-3">
                  <input
                  required
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                  className="w-full p-2 border rounded"
                  />
      
                { (question.type === 'sa') &&
                  <textarea 
                      required
                      placeholder="Answer"
                      value={question.answer}
                      onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="2"
                  />}

                  { (question.type === 'flashcard') &&
                  <textarea
                      required
                      placeholder="Answer"
                      value={question.answer}
                      onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="2"
                  />}

                  {(question.type === 'mcq') && (
                  <MultipleChoiceEditor questionData={question} setQuestionData={(updateData) => {
                    updateQuestion(question.id, 'options', updateData.options )
                    updateQuestion(question.id, 'correctIndex', updateData.correctIndex === index ? null : updateData.correctIndex)
                  }}/>
                  )}

                {(question.type === 'matching') && (
                <MatchingQuestionEditor content={question} onUpdate={(updateData) =>
                {
                  updateQuestion(question.id, 'pairs', updateData.pairs)
                }} />
              )}
              </div>
            </div>
        ))}
        </div>
    </div>
    </>
  )
}

export default ManualForm