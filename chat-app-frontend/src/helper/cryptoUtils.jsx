import { set, get } from "idb-keyval";
import axios from "axios";

// Generate RSA key pair
export async function generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
    );
    return keyPair;
}

// Export public key as Base64
export async function exportPublicKey(publicKey) {
    const exported = await window.crypto.subtle.exportKey("spki", publicKey);
    return arrayBufferToBase64(exported);
}

// Helper: ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

// Helper: Base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Store private key in IndexedDB
export async function storePrivateKeyLocally(privateKey) {
    const exportedPrivateKey = await window.crypto.subtle.exportKey(
        "pkcs8",
        privateKey
    );
    const privateKeyBase64 = arrayBufferToBase64(exportedPrivateKey);
    await set("privateKey", privateKeyBase64);
}

// Retrieve private key from IndexedDB
export async function getPrivateKey() {
    const privateKeyBase64 = await get("privateKey");
    if (!privateKeyBase64) throw new Error("Private key not found");
    const privateKeyBuffer = base64ToArrayBuffer(privateKeyBase64);
    return window.crypto.subtle.importKey(
        "pkcs8",
        privateKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );
}

// Encrypt message with recipient's public key
export async function encryptMessage(message, publicKeyBase64) {
    const publicKeyBuffer = base64ToArrayBuffer(publicKeyBase64);
    const publicKey = await window.crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );
    const encodedMessage = new TextEncoder().encode(message);
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedMessage
    );
    return arrayBufferToBase64(encrypted);
}

// Decrypt message with user's private key
export async function decryptMessage(encryptedMessageBase64, privateKey) {
    const encryptedMessageBuffer = base64ToArrayBuffer(encryptedMessageBase64);
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedMessageBuffer
    );
    return new TextDecoder().decode(decrypted);
}

// Fetch public key of a user by their ID
export async function fetchPublicKey(userId) {
    try {
      const response = await axios.get(`/api/user/${userId}/publicKey`);
      if (response.data && response.data.publicKey) {
        return response.data.publicKey;
      }
      throw new Error("Public key not found in response");
    } catch (error) {
      console.error("Error fetching public key:", error);
      throw error; // Re-throw to handle in the calling code
    }
  }
