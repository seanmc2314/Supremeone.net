// Sarah AI Chatbot - REAL AI with OpenAI Integration
// Marketing, Sales, Lead Capture, Appointment Scheduling

class SarahAI {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.apiUrl = 'https://supreme-one-api.onrender.com/api';
        this.userInfo = {};
        this.initialized = false;
        this.conversationActive = false;
        this.pollingInterval = null;
        this.lastMessageIndex = 0;
        this.chatStarted = false;
        this.chatStartTime = null;
        this.init();
    }

    init() {
        console.log('Sarah AI initialized with real AI backend');
        this.initialized = true;
        this.trackVisitor();
        this.trackPageView();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async trackVisitor() {
        try {
            const visitorId = this.getOrCreateVisitorId();
            const response = await fetch(`${this.apiUrl}/visitor/track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    visitorId,
                    page: window.location.pathname
                })
            });
            const stats = await response.json();
            console.log('Visitor tracked:', stats);
        } catch (error) {
            console.error('Visitor tracking error:', error);
        }
    }

    async trackPageView() {
        try {
            const pageName = window.location.pathname.replace('/', '') || 'index.html';
            await fetch(`${this.apiUrl}/analytics/pageview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: pageName })
            });
        } catch (error) {
            console.error('Page view tracking error:', error);
        }
    }

    async trackChatAction(action, data = {}) {
        try {
            await fetch(`${this.apiUrl}/analytics/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    action,
                    data
                })
            });
        } catch (error) {
            console.error('Chat tracking error:', error);
        }
    }

    async trackClick(element, page = null) {
        try {
            const pageName = page || window.location.pathname.replace('/', '') || 'index.html';
            await fetch(`${this.apiUrl}/analytics/click`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ element, page: pageName })
            });
        } catch (error) {
            console.error('Click tracking error:', error);
        }
    }

    getOrCreateVisitorId() {
        let visitorId = localStorage.getItem('supreme_one_visitor_id');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('supreme_one_visitor_id', visitorId);
        }
        return visitorId;
    }

    async sendMessage(message) {
        try {
            this.conversationActive = true;

            // Track chat start on first message
            if (!this.chatStarted) {
                this.chatStartTime = Date.now();
                await this.trackChatAction('start');
                this.chatStarted = true;
            }

            // Track message
            await this.trackChatAction('message');

            const response = await fetch(`${this.apiUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    sessionId: this.sessionId,
                    userInfo: this.userInfo
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            // If waiting for name, start polling for auto-response
            if (data.waitingForName) {
                this.lastMessageIndex = 2; // We have user message and assistant greeting
                this.startPolling();
            } else {
                // Stop polling if we get a direct response
                this.stopPolling();
            }

            return data.response;

        } catch (error) {
            console.error('Chat error:', error);
            return "I apologize, but I'm having trouble connecting right now. Please try again or email me directly at sarahai@supremeone.net";
        }
    }

    startPolling() {
        // Stop any existing polling
        this.stopPolling();

        // Poll every 2 seconds for new messages
        this.pollingInterval = setInterval(async () => {
            try {
                const response = await fetch(`${this.apiUrl}/chat/poll/${this.sessionId}?lastMessageIndex=${this.lastMessageIndex}`);
                const data = await response.json();

                if (data.newMessages && data.newMessages.length > 0) {
                    // Display each new message
                    data.newMessages.forEach(msg => {
                        if (typeof removeTypingIndicator === 'function') {
                            removeTypingIndicator();
                        }
                        if (typeof addMessageToChat === 'function') {
                            addMessageToChat(msg, 'assistant');
                        }
                    });

                    // Update the last message index
                    this.lastMessageIndex = data.currentIndex;

                    // Stop polling after receiving auto-response
                    this.stopPolling();
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
        }, 2000);
    }

    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
    }

    async captureContactInfo(contactInfo) {
        try {
            this.userInfo = { ...this.userInfo, ...contactInfo };

            await fetch(`${this.apiUrl}/contact/capture`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    contactInfo: this.userInfo
                })
            });

            return true;
        } catch (error) {
            console.error('Contact capture error:', error);
            return false;
        }
    }

    async getCalendlyUrl() {
        try {
            const response = await fetch(`${this.apiUrl}/calendly/availability`);
            const data = await response.json();
            return data.calendlyUrl;
        } catch (error) {
            console.error('Calendly error:', error);
            return 'https://calendly.com/sarahai-supremeone/30min';
        }
    }

    async endChat() {
        try {
            // Stop polling
            this.stopPolling();

            if (this.conversationActive) {
                // Calculate duration in seconds
                const duration = this.chatStartTime ? Math.round((Date.now() - this.chatStartTime) / 1000) : 0;

                // Track chat end
                if (this.chatStarted) {
                    await this.trackChatAction('end', { duration });
                }

                await fetch(`${this.apiUrl}/chat/end`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sessionId: this.sessionId
                    })
                });
                this.conversationActive = false;
            }
        } catch (error) {
            console.error('End chat error:', error);
        }
    }
}

// Initialize Sarah AI
const sarahAI = new SarahAI();

// Chat Interface Functions
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const isActive = chatWindow.classList.toggle('active');

    if (isActive) {
        document.getElementById('chatInput').focus();
    } else {
        // End chat when closed
        sarahAI.endChat();
    }
}

function openChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.add('active');
    document.getElementById('chatInput').focus();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Stop polling when user responds
    sarahAI.stopPolling();

    // Add user message to chat
    addMessageToChat(message, 'user');
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Get AI response from backend
        const response = await sarahAI.sendMessage(message);

        // Remove typing indicator
        removeTypingIndicator();

        // Add AI response to chat
        addMessageToChat(response, 'assistant');

        // Check if response asks for contact info
        if (response.toLowerCase().includes('email') ||
            response.toLowerCase().includes('phone') ||
            response.toLowerCase().includes('contact')) {
            // Could show contact form here
        }

        // Check if response mentions Calendly/scheduling
        if (response.toLowerCase().includes('schedule') ||
            response.toLowerCase().includes('demo') ||
            response.toLowerCase().includes('appointment')) {
            setTimeout(() => {
                showCalendlyOption();
            }, 1000);
        }

    } catch (error) {
        removeTypingIndicator();
        addMessageToChat("I apologize, but I'm having trouble right now. Please email me at sarahai@supremeone.net or call (864) 402-9723.", 'assistant');
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? 'Y' : 'S';

    const content = document.createElement('div');
    content.className = 'message-content';

    // Convert markdown-style formatting to HTML
    const formattedMessage = formatMessageContent(message);
    content.innerHTML = formattedMessage;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessageContent(message) {
    // Convert **bold** to <strong>
    message = message.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Convert *italic* to <em>
    message = message.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Convert line breaks
    message = message.replace(/\n/g, '<br>');

    // Convert bullet points
    message = message.replace(/^• /gm, '&nbsp;&nbsp;• ');
    message = message.replace(/^✓ /gm, '&nbsp;&nbsp;✓ ');
    message = message.replace(/^- /gm, '&nbsp;&nbsp;• ');

    return message;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message';
    typingDiv.id = 'typingIndicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'S';

    const content = document.createElement('div');
    content.className = 'message-content';

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';

    content.appendChild(indicator);
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    chatMessages.appendChild(typingDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function showCalendlyOption() {
    const calendlyUrl = 'https://calendly.com/sarahai-supremeone/30min';
    const message = `<div style="margin-top: 1rem; padding: 1rem; background: linear-gradient(135deg, #1e40af, #7c3aed); border-radius: 10px;">
        <p style="color: white; margin-bottom: 1rem;"><strong>Ready to schedule your demo?</strong></p>
        <a href="${calendlyUrl}" target="_blank" style="display: inline-block; background: white; color: #1e40af; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600;">📅 Book Your Demo Now</a>
    </div>`;

    addMessageToChat(message, 'assistant');
}

async function showContactForm() {
    const formHtml = `<div style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 10px;">
        <p style="margin-bottom: 1rem;"><strong>Great! Let me get your contact information:</strong></p>
        <form id="quickContactForm" onsubmit="submitQuickContact(event)" style="display: flex; flex-direction: column; gap: 0.75rem;">
            <input type="text" id="qcName" placeholder="Your Name" required style="padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
            <input type="email" id="qcEmail" placeholder="Email Address" required style="padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
            <input type="tel" id="qcPhone" placeholder="Phone Number" style="padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
            <input type="text" id="qcDealership" placeholder="Dealership Name" style="padding: 0.5rem; border: 1px solid #ddd; border-radius: 5px;">
            <button type="submit" style="padding: 0.75rem; background: #1e40af; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;">Submit</button>
        </form>
    </div>`;

    addMessageToChat(formHtml, 'assistant');
}

async function submitQuickContact(event) {
    event.preventDefault();

    const contactInfo = {
        name: document.getElementById('qcName').value,
        email: document.getElementById('qcEmail').value,
        phone: document.getElementById('qcPhone').value,
        dealership: document.getElementById('qcDealership').value
    };

    await sarahAI.captureContactInfo(contactInfo);

    addMessageToChat(`Thank you, ${contactInfo.name}! I've got your information and will have our team reach out shortly. In the meantime, would you like to schedule a demo?`, 'assistant');

    setTimeout(() => {
        showCalendlyOption();
    }, 500);
}

// End chat when page unloads
window.addEventListener('beforeunload', () => {
    sarahAI.endChat();
});

// Initialize chat on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sarah AI Chat initialized with real AI');
});
