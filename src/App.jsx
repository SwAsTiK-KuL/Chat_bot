import React, { useState, useCallback } from 'react';

const data = [
  {
    "CategoryID": 1,
    "CategoryName": "Gutters",
    "Services": [
      {
        "ServiceID": 100,
        "Questions": [
          {
            "Question": "What type of gutters are you interested in?",
            "Options": ["K-Style", "Half-Round", "Box"]
          },
          {
            "Question": "What is the nature of the service? ",
            "Options": ["Repair", "Install"]
          }
        ]
      }
    ]
  },
  {
    "CategoryID": 2,
    "CategoryName": "Gutters",
    "Services": [
      {
        "ServiceID": 101,
        "Questions": [
          {
            "Question": "Does your bathroom remodel require removing or adding walls? ",
            "Options": ["Yes", "No"]
          },
          {
            "Question": "Do you want to install new tiles or reface?",
            "Options": ["Install New Tiles", "Refacing "]
          },
          
        ]
      }
    ]
  },
  {
    "CategoryID": 3,
    "CategoryName": "Roofing",
    "Services": [
      {
        "ServiceID": 200,
        "Questions": [
          {
            "Question": "What type of security system are you looking for?",
            "Options": ["Smart", "Traditional"]
          },
          {
            "Question": "What is the nature of the installation? ",
            "Options": ["Partial installation", "Full installation"]
          }
        ]
      }
    ]
  },
  {
    "CategoryID": 4,
    "CategoryName": "Roofing",
    "Services": [
      {
        "ServiceID": 201,
        "Questions": [
          {
            "Question": "What type of concrete work do you need?",
            "Options": ["Driveaway", "Patio"]
          },
          {
            "Question": "What is the nature of the service?",
            "Options": ["Resurface", "Full Replacement"]
          }
        ]
      }
    ]
  },
  {
    "CategoryID": 5,
    "CategoryName": "Roofing",
    "Services": [
      {
        "ServiceID": 301,
        "Questions": [
          {
            "Question": "What type of landscaping service do you need?",
            "Options": ["Tree Trimming", "Garden Design", "Garden Maintaining", "Flowerbed Mowing"]
          },
      
        ]
      }
    ]
  },
  {
    "CategoryID": 6,
    "CategoryName": "Roofing",
    "Services": [
      {
        "ServiceID": 401,
        "Questions": [
          {
            "Question": "Do you need electrical wiring upgrades? ",
            "Options": ["Yes", "No"]
          },
          {
            "Question": "What type of service do you need?",
            "Options": ["Upgrade to 220V", "Install new fixtures"]
          }
        ]
      }
    ]
  },
  {
    "CategoryID": 7,
    "CategoryName": "Roofing",
    "Services": [
      {
        "ServiceID": 501,
        "Questions": [
          {
            "Question": "What type of plumbing service do you need? ",
            "Options": ["No", "Yes"]
          },
          {
            "Question": "What type of service do you need?",
            "Options": ["Leak Repair", " Drain CleaningInstall new fixtures", "Toilet Repair", "Basin Repair"]
          }
        ]
      }
    ]
  },
  
];


function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryID, setCategoryID] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentService, setCurrentService] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [userResponses, setUserResponses] = useState([]);
  const [isCollectingUserInfo, setIsCollectingUserInfo] = useState(false); 
  const [isDisplayingUserDetails, setIsDisplayingUserDetails] = useState(false);
  const [isShowingSummaryForm, setIsShowingSummaryForm] = useState(false); 
  const [currentField, setCurrentField] = useState('name'); 

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      resetChat();
      setChatHistory((prev) => [
        ...prev,
        { type: 'bot', message: 'Hello!! How Can I Help You' }, 
      ]);
    }
  }, [isOpen]);

  const resetChat = useCallback(() => {
    setChatHistory([]);
    setCurrentCategory(null);
    setCurrentService(null);
    setCurrentStep(0);
    setUserData({ name: '', email: '', address: '' });
    setUserResponses([]);
    setIsCollectingUserInfo(false);
    setIsDisplayingUserDetails(false);
    setIsShowingSummaryForm(false);
    setCurrentField('name');
  }, []);

  const handleCategorySubmit = useCallback(() => {
    const category = data.find((cat) => cat.CategoryID === parseInt(categoryID));
    if (category) {
      setCurrentCategory(category);
      setChatHistory((prev) => [
        ...prev,
        { type: 'bot', message: `Category found: ${category.CategoryName}. Please select a service:` },
        { type: 'services', services: category.Services },
      ]);
    } else {
      setChatHistory((prev) => [...prev, { type: 'bot', message: 'No matching category found.' }]);
    }
    setCategoryID('');
  }, [categoryID]);

  const handleServiceSelect = useCallback((service) => {
    setCurrentService(service);
    setCurrentStep(0);
    setChatHistory((prev) => [
      ...prev,
      { type: 'user', message: `Selected Service: ${service.ServiceID}` },
      { type: 'bot', message: service.Questions[0].Question },
      { type: 'options', options: service.Questions[0].Options },
    ]);
  }, []);


  const predictServiceID = (responses) => {
    // Example prediction logic
    if (responses[0] === "K-Style" && responses[1] === "Install") {
      return 100; // Service ID for Gutters with K-Style and Aluminum
    } else if (responses[0] === "K-Style" && responses[1] === "Repair") {
      return 102; // Adjust Service ID based on other responses
    }else if (responses[0] === "Half-Round" && responses[1] === "Install") {
      return 103; // Adjust Service ID based on other responses
    }else if (responses[0] === "Half-Round" && responses[1] === "Repair") {
      return 104; // Adjust Service ID based on other responses
    }else if (responses[0] === "Box" && responses[1] === "Install") {
      return 105; // Adjust Service ID based on other responses
    }else if (responses[0] === "Box" && responses[1] === "Repair") {
      return 106; // Adjust Service ID based on other responses
    }else if (responses[0] === "Half-Round" && responses[1] === "Copper") {
      return 107; // Adjust Service ID based on other responses
    }
    // Add more conditions based on your logic for other services
    return null; // Default case if no match found
  };
  const handleOptionSelect = useCallback((option) => {
    if (currentService) {
      setUserResponses((prev) => [...prev, option]);
      setChatHistory((prev) => [
        ...prev,
        { type: 'user', message: option },
        { type: 'bot', message: `You selected: ${option}` },
      ]);
  
      const nextStep = currentStep + 1;
      if (nextStep < currentService.Questions.length) {
        setChatHistory((prev) => [
          ...prev,
          { type: 'bot', message: currentService.Questions[nextStep].Question },
          { type: 'options', options: currentService.Questions[nextStep].Options },
        ]);
        setCurrentStep(nextStep);
      } else {
        // Predict Service ID based on user responses
        const predictedServiceID = predictServiceID(userResponses);
        setCurrentService((prev) => ({ ...prev, predictedServiceID })); // Store predicted Service ID in currentService
  
        setIsCollectingUserInfo(true);
        setChatHistory((prev) => [
          ...prev,
          { type: 'bot', message: `All questions answered. Now, please provide your name:` },
        ]);
      }
    }
  }, [currentService, currentStep, userResponses]);

  const handleUserInput = useCallback((input) => {
    if (isCollectingUserInfo) {
      if (currentField === 'name') {
        setUserData((prev) => ({ ...prev, name: input }));
        setCurrentField('email');
        setChatHistory((prev) => [
          ...prev,
          { type: 'user', message: input },
          { type: 'bot', message: `Thank you! Now, please provide your email:` },
        ]);
      } else if (currentField === 'email') {
        setUserData((prev) => ({ ...prev, email: input }));
        setCurrentField('address');
        setChatHistory((prev) => [
          ...prev,
          { type: 'user', message: input },
          { type: 'bot', message: `Thanks! Now, please provide your address:` },
        ]);
      } else if (currentField === 'address') {
        setUserData((prev) => ({ ...prev, address: input }));
        setChatHistory((prev) => [
          ...prev,
          { type: 'user', message: input },
          { type: 'bot', message: `Thank you for providing your details!` },
          { type: 'bot', message: `Here is the summary of your information:` },
        ]);
        setIsCollectingUserInfo(false);
        setIsDisplayingUserDetails(true);
        setIsShowingSummaryForm(true); 
      }
    }
  }, [isCollectingUserInfo, currentField]);

  const renderChatMessage = useCallback(
    (item, index) => {
      switch (item.type) {
        case 'user':
        case 'bot':
          return (
            <div key={index} className={`p-2 ${item.type === 'user' ? 'text-right' : 'text-left'}`}>
              <span
                className={`inline-block p-2 rounded-lg ${
                  item.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {item.message}
              </span>
            </div>
          );
        case 'services':
          return (
            <div key={index} className="p-2">
              <div className="flex flex-col space-y-2">
                {item.services.map((service) => (
                  <button
                    key={service.ServiceID}
                    onClick={() => handleServiceSelect(service)}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {service.Questions[0].Question}
                  </button>
                ))}
              </div>
            </div>
          );
        case 'options':
          return (
            <div key={index} className="p-2">
              <div className="flex flex-col space-y-2">
                {item.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleOptionSelect(option)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        default:
          return null;
      }
    },
    [handleServiceSelect, handleOptionSelect]
  );

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setPosition({ x: x - 50, y: y - 25 });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Category Selection</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
            placeholder="Enter Category ID"
            className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCategorySubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
          >
            Submit
          </button>
        </div>

        {/* Draggable Chat Button */}
        <button
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={toggleChat}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            transition: 'none',
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          {isOpen ? 'Close Chat' : '💬'}
        </button>
      </div>

      {isOpen && (
        <div className="w-full max-w-md mt-4 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-500 text-white p-4">
            <h3 className="text-lg font-bold">Chat</h3>
          </div>
          <div className="h-96 overflow-y-auto p-4">
            {chatHistory.map(renderChatMessage)}

            {/* Input for collecting name, email, and address */}
            {isCollectingUserInfo && (
              <div className="p-2">
                <input
                  type="text"
                  placeholder={`Enter your ${currentField}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUserInput(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            )}

            {/* Displaying collected user information */}
            {/* {isDisplayingUserDetails && (
              <div className="p-4 border-t border-gray-300 mt-4">
                <h4 className="font-bold">Your Details</h4>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Address: {userData.address}</p>
              </div>
            )} */}
          </div>
        </div>
      )}

      {/* Displaying Final Application Form */}
      {isShowingSummaryForm && (
        <div className="w-full max-w-md mt-4 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Application Form Summary</h3>
          <p><strong>Service ID:</strong> {currentService.ServiceID}</p>
          {currentService.Questions.map((question, idx) => (
            <p key={idx}><strong>{question.Question}:</strong> {userResponses[idx]}</p>
          ))}
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <br/>
          <p><strong> Thank Youu! You Will Be Contacted Soon.</strong></p>
        </div>
      )}
    </div>
  );
}

export default ChatBot;



