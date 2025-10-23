# Image Style Configuration

## Clean Separation of Concerns ✅

The image generation system now has a **clean separation** between:
- **Style/Character** (configured in plugin constant)
- **Action** (provided in code fence by AI)

## How It Works

### 1. Code Fence (Action Only)
AI writes only the action in the code fence:
````markdown
```pollinations
cheering happily
```
````

### 2. Style Configuration (Constant)
The style is defined in `src/lib/rehype-pollinations-codefence.ts`:
```typescript
// Character style configuration - change this to update the visual style
const CHARACTER_STYLE_PREFIX = "black and white cartoon mascot style, energetic shaggy dog with big floppy ears and friendly smile,";
```

### 3. Plugin Combines Them
```typescript
const fullPrompt = `${CHARACTER_STYLE_PREFIX} ${prompt}`;
// Result: "black and white cartoon mascot style, energetic shaggy dog with big floppy ears and friendly smile, cheering happily"
```

## Benefits

✅ **Clean separation** - Style config separate from action prompts  
✅ **Easy to change** - Update style in one place (line 20)  
✅ **AI simplicity** - AI only writes actions, not style details  
✅ **Maintainable** - No style strings scattered in code  
✅ **Testable** - Easy to test different styles

## Changing the Style

To change the character style, edit line 20 in `src/lib/rehype-pollinations-codefence.ts`:

### Current Style (Energetic Mascot)
```typescript
const CHARACTER_STYLE_PREFIX = "black and white cartoon mascot style, energetic shaggy dog with big floppy ears and friendly smile,";
```

### Alternative Styles

#### Minimalist Silhouette
```typescript
const CHARACTER_STYLE_PREFIX = "minimalist black and white silhouette, simple dog shape with floppy ears,";
```

#### Detailed Line Art
```typescript
const CHARACTER_STYLE_PREFIX = "black and white line art, detailed cartoon dog with expressive eyes and floppy ears,";
```

#### Vintage Comic Style
```typescript
const CHARACTER_STYLE_PREFIX = "vintage black and white comic book style, friendly dog character with floppy ears,";
```

#### Zen/Peaceful Style
```typescript
const CHARACTER_STYLE_PREFIX = "zen black and white illustration, peaceful dog with closed eyes and floppy ears,";
```

## File Structure

```
src/lib/rehype-pollinations-codefence.ts
├── Line 20: CHARACTER_STYLE_PREFIX (EDIT THIS)
├── Line 43: Combines style + action
└── Line 47: Builds final URL
```

## Example Flow

1. **AI writes**: `cheering happily` (in code fence)
2. **Plugin reads**: Line 36 extracts "cheering happily"
3. **Plugin combines**: Line 43 adds style prefix
4. **Result**: "black and white cartoon mascot style, energetic shaggy dog with big floppy ears and friendly smile, cheering happily"
5. **URL generated**: Line 47 encodes and builds Pollinations URL
6. **Image renders**: Plugin replaces code fence with `<img>` tag

## Testing Different Styles

To test a new style:
1. Edit line 20 in `rehype-pollinations-codefence.ts`
2. Run `npm run build`
3. Test in browser
4. Adjust if needed

## Current Configuration

**File**: `src/lib/rehype-pollinations-codefence.ts`  
**Line**: 20  
**Style**: Energetic cartoon mascot  
**Character**: Shaggy dog with big floppy ears and friendly smile  
**Format**: Black and white only

## Notes

- The comma at the end of `CHARACTER_STYLE_PREFIX` is intentional (separates style from action)
- The style should describe the **visual aesthetic**, not the action
- The action (from code fence) should describe **what the character is doing**
- Keep style string concise but descriptive enough for AI image generation
