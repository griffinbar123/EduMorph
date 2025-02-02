import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const MatchingQuestionEditor = ({ content, onUpdate }) => {
  // Data structure example:
  // content = { type: 'matching', pairs: [{ id: 1, prompt: 'Capital of France', answer: 'Paris' }, ...] }
  
  const [newPair, setNewPair] = useState({ prompt: '', answer: '' });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(content.pairs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onUpdate({ ...content, pairs: items });
  };

  const addPair = () => {
    if (newPair.prompt.trim() && newPair.answer.trim()) {
      onUpdate({
        ...content,
        pairs: [...content.pairs, {
          id: Date.now(),
          prompt: newPair.prompt.trim(),
          answer: newPair.answer.trim()
        }]
      });
      setNewPair({ prompt: '', answer: '' });
    }
  };

  const updatePair = (id, field, value) => {
    onUpdate({
      ...content,
      pairs: content.pairs.map(pair => 
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    });
  };

  const deletePair = (id) => {
    onUpdate({
      ...content,
      pairs: content.pairs.filter(pair => pair.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Matching Pairs</h3>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="matching-pairs">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="space-y-2"
              >
                {content.pairs.map((pair, index) => (
                  <Draggable key={pair.id} draggableId={String(pair.id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-white p-3 rounded border group flex gap-4 items-center"
                      >
                        <div 
                          {...provided.dragHandleProps}
                          className="text-gray-400 hover:text-gray-600 cursor-move"
                        >
                          <FontAwesomeIcon icon={faGripVertical} className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <input
                            value={pair.prompt}
                            onChange={(e) => updatePair(pair.id, 'prompt', e.target.value)}
                            className="p-2 border rounded"
                            placeholder="Prompt"
                          />
                          <input
                            value={pair.answer}
                            onChange={(e) => updatePair(pair.id, 'answer', e.target.value)}
                            className="p-2 border rounded"
                            placeholder="Answer"
                          />
                        </div>
                        
                        <button
                          onClick={() => deletePair(pair.id)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FontAwesomeIcon icon={faX} className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={newPair.prompt}
              onChange={(e) => setNewPair({ ...newPair, prompt: e.target.value })}
              placeholder="New prompt"
              className="p-2 border rounded"
            />
            <input
              type="text"
              value={newPair.answer}
              onChange={(e) => setNewPair({ ...newPair, answer: e.target.value })}
              placeholder="Matching answer"
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={addPair}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            Add Pair
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Preview</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="font-medium">Prompts</div>
          <div className="font-medium">Answers</div>
          {content.pairs.map((pair) => (
            <>
              <div  className="p-2 bg-white rounded border">
                {pair.prompt || <span className=" text-gray-400">Empty prompt</span>}
              </div>
              <div className="p-2 bg-white rounded border">
              {pair.answer || <span className="text-gray-400">Empty answer</span>}
            </div>
            </>
            ))}
            
        </div>
      </div>
    </div>
  );
};

export default MatchingQuestionEditor;