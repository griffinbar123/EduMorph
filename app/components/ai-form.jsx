import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faUpload, faX } from '@fortawesome/free-solid-svg-icons';

function AIForm({errors, formData, setFormData, handleFileUpload, removeFile, setErrors}) {

    const [showAdvanced, setShowAdvanced] = useState(false);
    
    const maxQuestions = 75
    const minQuestions = 5
    const errorMessage = `Number of questions must be between ${minQuestions} and ${maxQuestions}.`


  return (
    <>
        <div>
        <label className="block text-sm font-semibold mb-2">Study Topic</label>
        <input
            required
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            placeholder="Enter topic (e.g., Quantum Physics)"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        </div>
    
        <div>
        <label className="block text-sm font-semibold mb-2">
            Additional Notes (Optional)
        </label>
        <textarea
            value={formData.userNotes}
            onChange={(e) => setFormData({ ...formData, userNotes: e.target.value })}
            placeholder="Paste class notes, textbook excerpts, or other relevant material..."
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        </div>

        <div>
        <label className="block text-sm font-semibold mb-2">
            Upload Supporting Files (Optional)
        </label>
        <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors"
            onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('border-indigo-500');
            }}
            onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-indigo-500');
            }}
            onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('border-indigo-500');
            handleFileUpload(e.dataTransfer.files);
            }}
        >
            <FontAwesomeIcon icon={faUpload} className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-600">
            Drag and drop files here, or{' '}
            <label className="text-indigo-600 cursor-pointer">
                browse your device
                <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
                accept=".pdf,.txt,.doc,.docx,.ppt,.pptx,.xls,.xlsx,text/*"
                />
            </label>
            </p>
            <p className="text-xs text-gray-500 mt-2">
            Supported formats: PDF, Word, PowerPoint, Excel, Text files
            <br />
            Max file size: 25MB
            </p>
        </div>

        {/* Uploaded Files List */}
        {formData.uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
            {formData.uploadedFiles.map(file => (
                <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFile} className="h-5 w-5 text-gray-600" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)}MB)
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500"
                >
                    <FontAwesomeIcon icon={faX} className="h-4 w-4" />
                </button>
                </div>
            ))}
            </div>
        )}
        </div>
    
        {/* Advanced Options Toggle */}
        <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
        <span className="text-lg">{showAdvanced ? '▼' : '▶'}</span>
        <span>Advanced Options</span>
        </button>
    
        {/* Advanced Options Content */}
        {showAdvanced && (
        <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            {/* Question Count */}
            <div>
            <label className="block text-sm font-medium mb-2">
            Number of Questions
            </label>
            <input
            type="number"
            min={minQuestions}
            max={maxQuestions}
            value={formData.questionCount}
            onChange={(e) => {
                setFormData({ ...formData, questionCount: e.target.value });
                setErrors(prev => ({ ...prev, questionCount: (e.target.value < minQuestions || e.target.value > maxQuestions) ? errorMessage : null}));
            }}
            className={`w-full p-2 border rounded ${
                errors.questionCount ? 'border-red-500' : ''
            }`}
            />
            {errors.questionCount && (
            <p className="text-red-500 text-sm mt-1">{errors.questionCount}</p>
            )}
        </div>

            {/* Question Formats */}
            <div>
            <label className="block text-sm font-medium mb-2">
                Question Types
            </label>
            <div className="grid grid-cols-2 gap-3">
                {['flashcards', 'Multiple Choice', 'short-answer', 'essay', 'matching'].map((format) => (
                <label 
                    key={format}
                    className="flex items-center gap-2 p-3 bg-white rounded border"
                >
                    <input
                    type="checkbox"
                    checked={formData.allowedFormats.includes(format)}
                    onChange={(e) => {
                        const formats = e.target.checked
                        ? [...formData.allowedFormats, format]
                        : formData.allowedFormats.filter(f => f !== format);
                        setFormData({ ...formData, allowedFormats: formats });
                    }}
                    className="rounded text-indigo-600"
                    />
                    <span className="capitalize">
                    {format.replace('-', ' ')}
                    </span>
                </label>
                ))}
            </div>
            </div>

            {/* Difficulty & Cognitive Level */}
            <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-2">
                Difficulty Level
                </label>
                <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full p-2 border rounded"
                >
                {['Easy', 'Medium', 'Hard', 'Advanced'].map((level) => (
                    <option key={level} value={level} className="capitalize">
                    {level}
                    </option>
                ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                Cognitive Level
                </label>
                <select
                value={formData.bloomLevel}
                onChange={(e) => setFormData({ ...formData, bloomLevel: e.target.value })}
                className="w-full p-2 border rounded"
                >
                {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(
                    (level) => (
                    <option key={level} value={level} className="capitalize">
                        {level}
                    </option>
                    )
                )}
                </select>
            </div>
            </div>

            {/* Additional Options */}
            {/* <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-white rounded border">
                <input
                type="checkbox"
                checked={formData.includeDiagrams}
                onChange={(e) => setFormData({ ...formData, includeDiagrams: e.target.checked })}
                className="rounded text-indigo-600"
                />
                <span>Include diagrams and charts</span>
            </label>
            </div> */}

            <div>
            <label className="block text-sm font-medium mb-2">
                Additional Requests (Optional)
            </label>
            <textarea
                value={formData.additionalRequests}
                onChange={(e) => setFormData({ 
                ...formData, 
                additionalRequests: e.target.value 
                })}
                placeholder="Any special instructions for the AI? (e.g., 'Focus on battle dates', 'Make Mostly Flashcards', 'Use simple language')"
                rows="3"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="text-sm text-gray-500 mt-1">
                The AI will try its best to accommodate your specific needs
            </p>
            </div>
        </div>
        )}
              </>
  )
}

export default AIForm