import base64

# Your Base64 string
img_data = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMWFRUWGBcXFRcYGBgVFxYXFxcXFxcXGBcYHSggGB0lGxUXIjEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGy0lHR0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLf/AABEIAI4BYwMBIgACEQEDEQH..."  # truncated for readability

# Remove the "data:image/jpeg;base64," prefix
img_data = img_data.split(",")[1]

# Decode the Base64 string and write to a file
with open("profile.jpg", "wb") as f:
    f.write(base64.b64decode(img_data))

print("Image saved as profile.jpg")
