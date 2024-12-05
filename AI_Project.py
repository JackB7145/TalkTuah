import os
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, AutoModelForCausalLM

# Initialize the tokenizer and model with the token for Model 1 (DialoGPT)
tokenizer_1 = AutoTokenizer.from_pretrained("google/flan-t5-xl")
model_1 = AutoModelForSeq2SeqLM.from_pretrained(
    "google/flan-t5-xl").to('cpu')

# Initialize the tokenizer and model for Model 2 (FLAN-T5)
tokenizer_2 = AutoTokenizer.from_pretrained("google/flan-t5-xl")
model_2 = AutoModelForSeq2SeqLM.from_pretrained(
    "google/flan-t5-xl").to('cpu')


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


# Start with an initial prompt
conversation_prompt = "how to prevent from school bullying?"

# Loop indefinitely for a conversation between two models
while True:
    print("Model 1:", conversation_prompt)
    response_1 = generate_response(model_1, tokenizer_1, conversation_prompt)
    print("Model 2:", response_1)

    response_2 = generate_response(model_2, tokenizer_2, response_1)
    conversation_prompt = response_2
