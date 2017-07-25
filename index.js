'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.8d76118f-abb4-4296-892c-384d62211bdb";

var SKILL_NAME = "NeuroFacts";
var GET_FACT_MESSAGE = ["Here's your fact: ", "Alright, your NeuroFact is: ", "Okay, here is a NeuroFact: ", "Okay, your NeuroFact is: ", "Alright, here is a NeuroFact: "];
var HELP_MESSAGE = "You can say tell me a Neuro Fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = ["I hope you've learned a lot about the brain! Goodbye!", "Okay, see you next time!", "Alright, see you later!", "Goodbye!"];

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
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
    "The idea that some people are left-brained and some are right brained is a myth. The left side is not more logical than the right side of the brain. The right side is also not more creative than the left side.",
    "Broca's area is a region in the frontal lobe that is responsible for speech production.",
    "Aphasia is the inability to express or understand speech. It's often caused by brain damage.",
    "Prosopagnosia, or face blindness, is a severe deficit in face perception. One with prosopagnosia often has trouble recognizing one's own face and the faces of familiar people.",
    "Apraxia is a motor disorder in which the afflicted individual has trouble with motor planning. One with apraxia often finds it difficult to execute purposeful movements."
];
var factArr = data;

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var reprompt = "Would you like to hear another neuroFact? Say yes to hear another NeuroFact or say no to end this session. ";
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var responseIndex = Math.floor(Math.random()* GET_FACT_MESSAGE.length);
        var speechOutput = GET_FACT_MESSAGE[responseIndex] + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.YesIntent': function() {
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        this.emit(':tell', "Great! Here's another NeuroFact. " + randomFact);
    },
    'AMAZON.NoIntent': function() {
        var responseIndex = Math.floor(Math.random()* STOP_MESSAGE.length);        
        this.emit(':tell', STOP_MESSAGE[responseIndex]);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};