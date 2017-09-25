var Alexa = require('alexa-sdk');
var APP_ID = "amzn1.ask.skill.8d76118f-abb4-4296-892c-384d62211bdb";

var SKILL_NAME = "NeuroFacts";
var GET_FACT_MESSAGE = ["Here's your fact: ", "Alright, your NeuroFact is: ", "Okay, here is a NeuroFact: ", "Okay, your NeuroFact is: ", "Alright, here is a NeuroFact: "];
var SAMPLE_INTENTS = ["Give me a fact about the brain", "Tell me something about the brain", "Tell me some NeuroFacts", "Give me some NeuroFacts", "Start NeuroFacts", "Ask NeuroFacts", "Tell me a NeuroFact"];
var HELP_MESSAGE = " or you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = ["I hope you've learned a lot about the brain! Goodbye!", "Okay, see you next time!", "Alright, see you later!", "Goodbye!"];
var REPROMPT_QUESTIONS = [ " Would you like to hear another neuroFact?", "Do you want another NeuroFact?", "How about another Neuro Fact?", "Would you like another NeuroFact?"]
var REPROMPT_MESSAGE = " Say yes to hear another NeuroFact or say no to end this session. ";
var RESPONSE_MESSAGE = ["Great!", "Awesome!" ]
var data = [
    "The human brain is the largest brain of all vertebrates relative to body size.",
    "The human brain has around a hundred billion neurons.",
    "The cerebrum makes up 85 percent of the brain's weight.",
    "The cerebellum has more neurons than all other parts of the brain combined.",
    "The human brain weighs about 3 pounds.",
    "The central nervous system, or the CNS, is composed entirely of two kinds of specialized cells: neurons and glia.",
    "Only 5 minutes without oxygen can cause brain damage.",
    "Permanent brain damage can be cause by a 5 to 10 minute period with no oxygen.",
    "Hebb's law states that neurons that fire together wire together.",
    "A typical action potential lasts 1 millisecond. It takes roughly 300 to 400 milliseconds to blink an eye.",
    "A giant squid axon, which is up to 1 millimeter in diameter, is so large, it is visible by the naked eye. ",
    "The cerebrum, or cortex, is divided into two hemispheres: the left and the right.",
    "The cortex is split into four sections, or lobes: the frontal lobe, the parietal lobe, the occipital lobe, and the temporal lobe.",
    "There are roughly 21 to 26 billion neurons in the cerebral cortex.",
    "The human brain is connected by approximately 100 trillion synapses. A synapse is a connection between one neuron and another neuron.",
    "Most neurons in the adult brain do not undergo cell division.",
    "A typical neuron is made up of dendrites, an axon, and a soma. ",
    "The two most common neurotransmitters in the brain are GABA and glutamate.",
    "Sensory neurons respond to stimuli such as touch, smell, sound, or light.",
    "Neurogenesis in the adult brain can still be seen in the dentate gyrus of the hippocampus and the olfactory bulb.",
    "Neurons communicate using a combination of electrical and chemical signals.",
    "A human's nervous system is composed of the central and peripheral nervous system. The central nervous system consists of the brain and spinal cord. The peripheral nervous system refers to all other nerves.",
    "The central nervous system is composed of gray and white matter. White matter is made of long range axon tracts while gray matter consists of neuronal cell bodies and glial cells.",
    "Humans do not have the biggest brains. Sperm whales hold that distinction with 17 pound brains.",
    "Babies lose around half their neurons before they are born. ",
    "The hippocampus is responsible for governing the processes that dictate memory storage. Damage to the hippocampus can lead to the inability to form memories.",
    "The Corpus Callosum is a tract of nerve fibers that connects the two hemispheres of the human brain. The symptoms of epilepsy can sometimes be reduced by removing the corpus callosum.",
    "Myelin is a fatty white substance that surrounds an axon. It acts as an insulator to make action potentials very fast. ",
    "The brainstem is responsible for regulating the basic body processes of breathing, swallowing, heart rate, and blood pressure. ",
    "The brain contains at least ten times more glial cells than neurons.",
    "The human brain is the only organ that lacks nerves. The brain feels no pain!",
    "The idea that some people are left-brained and some are right brained is a myth. The left side is not more logical than the right side of the brain. The right side is also not more creative than the left side. ",
    "Broca's area is a region in the frontal lobe that is responsible for speech production.",
    "Aphasia is the inability to express or understand speech. It's often caused by brain damage.",
    "Prosopagnosia, or face blindness, is a severe deficit in face perception. One with prosopagnosia often has trouble recognizing one's own face and the faces of familiar people.",
    "Apraxia is a motor disorder in which the afflicted individual has trouble with motor planning. One with apraxia often finds it difficult to execute purposeful movements."
];
var factArr = data;
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(currStateHandlers);
    alexa.execute();
};

var currStateHandlers = {
    'LaunchRequest': function() {
        var sampIndex = Math.floor(Math.random() * SAMPLE_INTENTS.length);
        var output = "You can say " + SAMPLE_INTENTS[sampIndex] + HELP_MESSAGE;
        this.emit(':ask', "Hello, " + output , output);
    },
    'GetNewFactIntent': function () {
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var responseIndex = Math.floor(Math.random()* GET_FACT_MESSAGE.length);
        var speechOutput = GET_FACT_MESSAGE[responseIndex] + randomFact;
        var repromptIndex = Math.floor(Math.random()* REPROMPT_QUESTIONS.length);
        this.emit(':ask', speechOutput + " " + REPROMPT_QUESTIONS[repromptIndex] +  " " + REPROMPT_MESSAGE, REPROMPT_MESSAGE);
    },
    'AMAZON.HelpIntent': function () {
        var sampIndex = Math.floor(Math.random() * SAMPLE_INTENTS.length);
        var output = "You can say " + SAMPLE_INTENTS[sampIndex] + HELP_MESSAGE;
        var reprompt = REPROMPT_MESSAGE;
        this.emit(':ask', output, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.YesIntent': function () {
        this.emit('GetNewFactIntent');
    },
    'AMAZON.NoIntent': function () {
        var output = STOP_MESSAGE[Math.floor(Math.random()* STOP_MESSAGE.length)]; 
        this.emit(':tell', output);
    },
    'Unhandled': function () {
        var sampIndex = Math.floor(Math.random() * SAMPLE_INTENTS.length);
        var output = "You can say " + SAMPLE_INTENTS[sampIndex] + HELP_MESSAGE;
        this.emit(':ask', output, output);
    }
};
