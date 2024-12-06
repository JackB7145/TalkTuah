from rag import get_relevant_info
import os
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


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
    model_name = "google/flan-t5-xl"

    # Initialize tokenizers and models for both sides of the debate
    tokenizer_1 = AutoTokenizer.from_pretrained(model_name)
    model_1 = AutoModelForSeq2SeqLM.from_pretrained(model_name).to("cpu")

    tokenizer_2 = AutoTokenizer.from_pretrained(model_name)
    model_2 = AutoModelForSeq2SeqLM.from_pretrained(model_name).to("cpu")

    initial_prompt = f'''
    You are a debate bot tasked with defending the topic: "{topic}" in a formal debate setting.
    Your goal is to convince the audience of your position (pro-{topic}) by presenting a strong opening statement.

    Your opening statement should follow this structure:
    1. **Hook**: Start with a compelling and bold claim that highlights the importance or correctness of your position on "{topic}".
    2. **Argument**: Provide 2-3 logical reasons why your position on "{topic}" is correct and why the opposing side's position is flawed.
    3. **Conclusion**: Summarize your position on "{topic}" in a confident and persuasive way.

    Remember:
    - Be specific about "{topic}" in your arguments.
    - Avoid generic phrases such as "opinions matter" unless they directly support your position.
    - Use formal and logical language.

    Please begin with your opening statement on "{topic}".
    '''
    opening_statement = generate_response(model_1, tokenizer_1, initial_prompt)
    print("Debate Bot 1 Opening Statement:")
    print(opening_statement)

    # Continue the debate with the second model
    response_statement = generate_response(
        model_2, tokenizer_2, opening_statement)
    print("Debate Bot 2 Response:")
    print(response_statement)
    return


simulateDebate("Abortion")
