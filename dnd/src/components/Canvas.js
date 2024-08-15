import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import Xarrow from "react-xarrows";
import Modal from "react-modal";

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]); // Store the selected cards for connections
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCard = () => {
    const id = `card-${cards.length + 1}`;
    const newCard = {
      id,
      text: "This is a dummy text. Lorem ipsum dolor sit amet...",
    };
    setCards([...cards, newCard]);
  };

  const handleShowMore = (text) => {
    setModalContent(text);
    setIsModalOpen(true);
  };

  // Handle card selection for arrows
  const handleCardSelect = (cardId) => {
    if (selectedCards.length === 0) {
      setSelectedCards([cardId]);
    } else if (selectedCards.length === 1) {
      setSelectedCards([...selectedCards, cardId]);
      setArrows([...arrows, { start: selectedCards[0], end: cardId }]); // Add arrow
      setSelectedCards([]); // Reset selected cards
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "scroll",
        border: "1px solid black",
        position: "relative",
      }}
    >
      <button onClick={addCard}>Add Card</button>
      <p>Select two cards to connect with an arrow</p>

      {cards.map((card) => (
        <Draggable key={card.id}>
          <ResizableBox width={200} height={100}>
            <div
              id={card.id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                background: "#f9f9f9",
                cursor: "pointer",
              }}
              onClick={() => handleCardSelect(card.id)} // Select the card when clicked
            >
              <p>
                {card.text.slice(0, 30)}...{" "}
                <button onClick={() => handleShowMore(card.text)}>
                  Show More
                </button>
              </p>
            </div>
          </ResizableBox>
        </Draggable>
      ))}

      {arrows.map((arrow, index) => (
        <Xarrow
          key={index}
          start={arrow.start}
          end={arrow.end}
          color="blue"
          strokeWidth={3}
          headSize={6}
        />
      ))}

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Card Details</h2>
        <p>{modalContent}</p>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Canvas;
