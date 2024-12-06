from rag import get_relevant_info
import os
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForCausalLM


def generate_response(model, tokenizer, prompt, max_tokens=100, temperature=0.9):
    inputs = tokenizer(prompt, return_tensors='pt').to(model.device)
    outputs = model.generate(
        inputs['input_ids'],
        max_new_tokens=max_tokens,
        temperature=temperature,
        do_sample=True,
        attention_mask=inputs['attention_mask'],
        pad_token_id=tokenizer.eos_token_id  # Set `pad_token_id` explicitly
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)


def simulateDebate(topic):
    model_name = "google/flan-t5-large"
    tokenizer_1 = AutoTokenizer.from_pretrained(model_name)
    model_1 = AutoModelForSeq2SeqLM.from_pretrained(model_name).to("cpu")

    tokenizer_2 = AutoTokenizer.from_pretrained(model_name)
    model_2 = AutoModelForSeq2SeqLM.from_pretrained(model_name).to('cpu')
    initial_prompt = '''
    You are a debate bot tasked with defending the topic: "${topic}" in a formal debate setting. 
    Your goal is to convince the audience of your position (pro-${topic}) by presenting a strong opening statement.

    Your opening statement should follow this structure:
    1. **Hook**: Start with a compelling and bold claim that highlights the importance or correctness of your position on "${topic}".
    2. **Argument**: Provide 2-3 logical reasons why your position on "${topic}" is correct and why the opposing side's position is flawed.
    3. **Conclusion**: Summarize your position on "${topic}" in a confident and persuasive way.

    Remember:
    - Be specific about "${topic}" in your arguments.
    - Avoid generic phrases such as "opinions matter" unless they directly support your position.
    - Use formal and logical language.

    Please begin with your opening statement on "${topic}".
    '''
    opening_statement = generate_response(model_1, tokenizer_1, initial_prompt)
    print("Bot 1: " + opening_statement)
    conversation_history_bot1 = []
    conversation_history_bot2 = []
    conversation_history_bot1.append(opening_statement)

    flag = True
    for i in range(5):
        curr_conv = ""
        for j in range(max(len(conversation_history_bot1), len(conversation_history_bot2))):
            if (j < len(conversation_history_bot1)):
                curr_conv += "Bot 1: " + conversation_history_bot1[j]
            if (j < len(conversation_history_bot2)):
                curr_conv += "Bot 2: " + conversation_history_bot2[j]
        if (flag):
            prompt = """You are a bot that is against ${topic}. Your name is Bot 2. Here is the current conversation: ${curr_conv}.
            Please provide me with a rebuttal
            """
            res = generate_response(model_2, tokenizer_2, prompt)
            conversation_history_bot2.append(res)

        else:
            prompt = """You are a bot that is pro ${topic}. Your name is Bot 1. Here is the current conversation: ${curr_conv}.
            Please provide me with a rebuttal
            """
            res = generate_response(model_1, tokenizer_1, prompt)
            conversation_history_bot2.append(res)
    curr_conv = ""
    for j in range(max(len(conversation_history_bot1), len(conversation_history_bot2))):
        if (j < len(conversation_history_bot1)):
            curr_conv += "Bot 1: " + conversation_history_bot1[j]
        if (j < len(conversation_history_bot2)):
            curr_conv += "Bot 2: " + conversation_history_bot2[j]
    prompt_bot_2 = "You are a bot that is against ${topic}. Your name is Bot 2. Here is the current conversation: ${curr_conv}. Please make a concluding statement on this debate"
    conversation_history_bot2.append(
        generate_response(model_2, tokenizer_2, prompt_bot_2))
    prompt_bot_1 = "You are a bot that is pro ${topic}. Your name is Bot 1. Here is the current conversation: ${curr_conv}. Please make a concluding statement on this debate"
    conversation_history_bot1.append(
        generate_response(model_1, tokenizer_1, prompt_bot_1))
    conv = []
    for i in range(len(conversation_history_bot1)):
        conv.append(conversation_history_bot1[i])
        conv.append(conversation_history_bot2[i])

    print(conv)
    return conv


simulateDebate("Christianity")
