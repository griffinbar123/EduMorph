import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faX, faPlus } from '@fortawesome/free-solid-svg-icons';

const SequenceQuestionEditor = ({ content, onUpdate }) => {
  const [newItem, setNewItem] = useState('');
  
  // Initialize with sample data structure:
  // content = { type: 'sequence', items: ['Event A', 'Event B'], correctOrder: [1, 0] }
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newCorrectOrder = content.correctOrder;
    const [removed] = newCorrectOrder.splice(result.source.index, 1);
    newCorrectOrder.splice(result.destination.index, 0, removed);

    
    onUpdate({
        ...content,
      correctOrder: newCorrectOrder
    });
  };

  const addItem = () => {
    if (newItem.trim()) {
      onUpdate({
        ...content,
        items: [...content.items, newItem.trim()],
        correctOrder: [...content.correctOrder, content.items.length]
      });
      setNewItem('');
    }
  };

  const deleteItem = (index) => {
    const newItems = content.items.filter((_, i) => i !== content.correctOrder[index]); 
    const newCorrectOrder = content.correctOrder
      .filter((_, i) => i !== index)
      .map(ci => ci > content.correctOrder[index] ? ci - 1 : ci);
      
    onUpdate({
      ...content,
      items: newItems,
      correctOrder: newCorrectOrder
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Sequence Items</h3>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sequence-items">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="space-y-2"
              >
                {content.correctOrder.map((orderIndex, index) => (
                  <Draggable key={`item-${index}`} draggableId={`item-${index}`} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-2 bg-white p-3 rounded border group"
                      >
                        <div 
                          {...provided.dragHandleProps}
                          className="text-gray-400 hover:text-gray-600 cursor-move"
                        >
                          <FontAwesomeIcon icon={faGripVertical} className="h-4 w-4" />
                        </div>
                        
                        <span className="flex-1">{content.items[orderIndex]}</span>
                        
                        <button
                          onClick={() => deleteItem(index)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FontAwesomeIcon icon={faX}  className="h-4 w-4" />
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

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new sequence item"
            className="flex-1 p-2 border rounded"
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <button
            onClick={addItem}
            className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            <FontAwesomeIcon icon={faPlus}  className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-4">Correct Order</h3>
        <div className="space-y-2">
          {content.correctOrder.map((orderIndex, sequencePosition) => (
            <div 
              key={sequencePosition}
              className="bg-white p-3 rounded border flex items-center gap-3"
            >
              <span className="text-gray-500 w-6">#{sequencePosition + 1}</span>
              <span className="flex-1">{content.items[orderIndex]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SequenceQuestionEditor;