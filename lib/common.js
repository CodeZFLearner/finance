import fetch from 'node-fetch';

export async function postJson(url, body, headers = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'sec_android',
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: { ...defaultHeaders, ...headers },
    body: JSON.stringify(body),
  });
  return resp.json();
}

export async function postForm(url, formData, headers = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: { ...defaultHeaders, ...headers },
    body: formData,
  });
  return resp.text();
}

export async function getJson(url, headers = {}) {
  const resp = await fetch(url, {
    method: 'GET',
    headers: { 'User-Agent': 'sec_android', ...headers },
  });
  return resp.json();
}

export function timestamp() {
  return Date.now();
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}
