import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function MultipleChoiceEditor({questionData, setQuestionData}) {
    console.log(questionData)
  return (
    <div className="space-y-3">
        <label className="block text-sm font-medium">Options</label>
        {questionData.options.map((option, index) => (
        <div key={index} className="flex items-center gap-2">
            <input
            type="radio"
            checked={questionData.correctIndex === index}
            onChange={() => setQuestionData({ ...questionData, correctIndex: index })}
            />
            <input
            value={option.text}
            onChange={(e) => {
                const newOptions = [...questionData.options];
                newOptions[index] = { text: e.target.value };
                setQuestionData({ ...questionData, options: newOptions });
            }}
            className="flex-1 p-2 border rounded"
            placeholder={`Option ${index + 1}`}
            />
            <button
            onClick={() => {
                const newOptions = questionData.options.filter((_, i) => i !== index);
                setQuestionData({
                ...questionData,
                options: newOptions,
                correctIndex: questionData.correctIndex === index ? null : questionData.correctIndex
                });
            }}
            className="text-red-500 hover:text-red-700"
            >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
        </div>
        ))}
        <button
        onClick={() => setQuestionData({
            ...questionData,
            options: [...questionData.options, { text: '' }]
        })}
        className="text-indigo-600 hover:text-indigo-700 text-sm"
        >
        + Add Option
        </button>
    </div>
  )
}

export default MultipleChoiceEditor