# Rules Command

The rules command can only be ran by the user who has the owner role, set out in config.json.

## rules.txt Syntax

"> ": Creates a new box for a new set of information. The text on the same line becomes the title of the box and all lines after become the box's description.  
"> #{URL}": Creates a new image box with the image located at {URL}.

All other markdown rules in discord work for text too, such as double asterisk for bold, etc.