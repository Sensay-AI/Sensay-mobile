import { ApiFeedResponse, UserResponse } from "./api.types"

export function toString(response: UserResponse | ApiFeedResponse): string {
  if (response.interfaceTag === 'ApiFeedResponse') {
    const feedStr = JSON.stringify(response.feed);
    const itemsStr = response.items.map((item) => JSON.stringify(item)).join(', ');
    return `<ApiFeedResponse: { status: "${response.status}", feed: ${feedStr}, items: [${itemsStr}] }>`;
  }
  if (response.interfaceTag === 'UserResponse') {
    const { picture, ...rest } = response;
    const pictureTemplate = picture ? `, "picture": "${picture}"` : '';
    return `<UserResponse: ${JSON.stringify(rest)} ${pictureTemplate}>`;
  }
  return ""
}


