#!/usr/bin/env python3
"""
Generate a short bedtime story using the modern OpenAI Python SDK.
Requires: `pip install openai`
Set your API key in the `OPENAI_API_KEY` environment variable.
"""
import os
import sys
import argparse
from openai import OpenAI
from typing import Optional


def main():
    parser = argparse.ArgumentParser(description="Generate a short story using OpenAI Chat Completions")
    parser.add_argument('--model', default='gpt-3.5-turbo', help='Model name to use')
    parser.add_argument('--prompt', default='Write a concise, one-sentence bedtime story about a unicorn.', help='Prompt to send to the model')
    parser.add_argument('--max-tokens', type=int, default=30, help='Maximum tokens for the response')
    parser.add_argument('--temperature', type=float, default=0.7, help='Sampling temperature')
    parser.add_argument('--offline', action='store_true', help='Return a mocked story without calling the API')
    parser.add_argument('--env-file', default='.env', help='Optional path to .env file to load OPENAI_API_KEY')
    args = parser.parse_args()

    # Lazy load dotenv if available to reduce mandatory deps
    if os.path.isfile(args.env_file):
        try:
            from dotenv import load_dotenv  # type: ignore
            load_dotenv(args.env_file)
        except Exception:
            pass  # Non-fatal if python-dotenv is not installed

    if args.offline:
        mocked = offline_story(args.prompt)
        print("\n--- Mocked Bedtime Story (offline) ---")
        print(mocked)
        print("--------------------------------------\n")
        return

    if not os.getenv('OPENAI_API_KEY'):
        print('Error: OPENAI_API_KEY environment variable is not set.', file=sys.stderr)
        print('Set it with: export OPENAI_API_KEY="sk-..."', file=sys.stderr)
        print('Or run with --offline for a mocked response.')
        sys.exit(1)

    try:
        client = OpenAI()
    except Exception as e:
        print(f"Error initializing OpenAI client: {e}", file=sys.stderr)
        sys.exit(1)

    try:
        print(f"Requesting content from model: {args.model}...")
        response = client.chat.completions.create(
            model=args.model,
            messages=[{"role": "user", "content": args.prompt}],
            temperature=args.temperature,
            max_tokens=args.max_tokens,
        )

        # Safely extract the generated text
        try:
            story_text = response.choices[0].message.content.strip()
        except Exception:
            # Fallback if the response shape is unexpected
            story_text = str(response)

        print("\n--- Generated Bedtime Story ---")
        print(story_text)
        print("-------------------------------\n")

    except Exception as e:
        # Provide graceful fallback for quota errors or other issues
        err_text = str(e)
        print(f"\nAn API error occurred: {err_text}", file=sys.stderr)
        if 'insufficient_quota' in err_text or '429' in err_text:
            print('Quota issue detected. Falling back to offline mock. Use --offline to avoid this message.')
            mocked = offline_story(args.prompt)
            print("\n--- Mocked Bedtime Story (quota fallback) ---")
            print(mocked)
            print("----------------------------------------------\n")
            return
        print("Please check your API key and ensure the model name is correct.")
        sys.exit(1)


def offline_story(prompt: str) -> str:
    # Simple heuristic mock: shorten prompt and add canned ending.
    base = prompt.strip().rstrip('.')
    if len(base) > 60:
        base = base[:57].rsplit(' ', 1)[0] + '...'
    return f"{base} – and everyone slept peacefully under the starlit sky."


if __name__ == '__main__':
    main()
