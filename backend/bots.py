from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


def generate_response(model, tokenizer, prompt, max_tokens=100, temperature=1):
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
    model_name = "google/flan-t5-xl"  # Using the large model for higher accuracy
    tokenizer_1 = AutoTokenizer.from_pretrained(model_name)
    model_1 = AutoModelForSeq2SeqLM.from_pretrained(model_name).to("cpu")

    tokenizer_2 = AutoTokenizer.from_pretrained(model_name)
    model_2 = AutoModelForSeq2SeqLM.from_pretrained(model_name).to("cpu")

    # Define a more focused and clear opening prompt
    initial_prompt = f'''
    You are a debate bot discussing the topic: "{topic}". 
    Your job is to convince the audience of your position by delivering a strong opening statement.
    
    Your opening statement must include the following structure:
    1. **Hook**: A bold and compelling claim that grabs the audience's attention and establishes your position on "{topic}".
    2. **Argument**: Present 2-3 solid, logically sound reasons supporting your position. Each reason should be backed by clear facts or well-reasoned arguments.
    3. **Conclusion**: Wrap up your argument confidently by reinforcing your position on "{topic}" and making a final, persuasive statement.

    Start with your opening statement on "{topic}".
    '''
    opening_statement = generate_response(model_1, tokenizer_1, initial_prompt)
    conversation_history_bot1 = [opening_statement]
    conversation_history_bot2 = []

    flag = True
    for i in range(3):  # Reduced the number of conversation turns to speed up
        curr_conv = ""
        for j in range(max(len(conversation_history_bot1), len(conversation_history_bot2))):
            if j < len(conversation_history_bot1):
                curr_conv += f"Bot 1: {conversation_history_bot1[j]}\n"
            if j < len(conversation_history_bot2):
                curr_conv += f"Bot 2: {conversation_history_bot2[j]}\n"

        # Rebuttal from Bot 2
        if flag:
            prompt = f"""
            You are Bot 2, arguing against the position on "{topic}" that Bot 1 has just presented. You are speaking to Bot 1.
            Your goal is to refute their arguments by demonstrating flaws, weaknesses, or overlooked factors in their reasoning.
            You have a strong understanding of the subject matter. The conversation so far is:
            {curr_conv}
            Please provide a clear and logical rebuttal, focusing on countering Bot 1's arguments directly.
            """
            res = generate_response(model_2, tokenizer_2, prompt)
            conversation_history_bot2.append(res)
        # Rebuttal from Bot 1
        else:
            prompt = f"""
            You are Bot 1, defending the position on "{topic}" that you presented earlier. You are speaking to Bot 2.
            Your job is to address the rebuttals made by Bot 2 by reinforcing your arguments, clarifying any misunderstandings, and providing additional evidence or reasoning.
            You have a strong understanding of the subject matter. The conversation so far is:
            {curr_conv}
            Please provide a strong rebuttal, pointing out why Bot 2's counterarguments are not valid or convincing.
            """
            res = generate_response(model_1, tokenizer_1, prompt)
            conversation_history_bot1.append(res)

        flag = not flag  # Alternate turns

    # Add the concluding statements
    curr_conv = ""
    for j in range(max(len(conversation_history_bot1), len(conversation_history_bot2))):
        if j < len(conversation_history_bot1):
            curr_conv += f"Bot 1: {conversation_history_bot1[j]}\n"
        if j < len(conversation_history_bot2):
            curr_conv += f"Bot 2: {conversation_history_bot2[j]}\n"

    # Conclusion from Bot 2
    prompt_bot_2 = f"""
    You are Bot 2, and your job is to provide a strong conclusion arguing against the position on "{topic}" that Bot 1 has defended.
    Here is the conversation so far:
    {curr_conv}
    Please make a concluding statement, summarizing why your position on "{topic}" is superior and why Bot 1's arguments are flawed or insufficient.
    """
    conversation_history_bot2.append(
        generate_response(model_2, tokenizer_2, prompt_bot_2))

    # Conclusion from Bot 1
    prompt_bot_1 = f"""
    You are Bot 1, and your job is to provide a strong conclusion defending your position on "{topic}" against Bot 2's rebuttals.
    Here is the conversation so far:
    {curr_conv}
    Please make a concluding statement, summarizing why your position on "{topic}" is superior and why Bot 2's counterarguments are flawed or insufficient.
    """
    conversation_history_bot1.append(
        generate_response(model_1, tokenizer_1, prompt_bot_1))

    # Combine the conversation history into a final output
    conv = []
    for i in range(len(conversation_history_bot1)):
        conv.append({"name": "Bot 1", "topic": conversation_history_bot1[i]})
        if i < len(conversation_history_bot2):
            conv.append(
                {"name": "Bot 2", "topic": conversation_history_bot2[i]})

    return conv
