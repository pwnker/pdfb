# PDFB

A pdf building library for nodejs hehe.

---

## TODO

* [ ] ```Section.class``` calculate **start**, **end**, **size** based of the elements inside
  * basically a way of creating a wrapper (background) that covers all elements of a section

* [ ] ```Page```
  * Stores individual page data
  * ```Section[]```
  * ```PdfBuilder.class``` stores a page array ```Page[]```
  * Page props:
    * ``` typescript
        private Elements: {
          Texts: Text[];
          Lines: Line[];
          Images: Image[];
          Rects: Rect[];
        }
      ```
    * ``` typescript
        private pageNumber: number;
      ```

* [ ] Fix padding handling inside ```PdfBuilder```
  * Padding should affect the document start/end positions

* [ ] PdfBuilder 
  * [ ] save document
  ```typescript
      save(options?: {
        render: true,
        savePath: ''
      })
  ```
  * [ ] Save path setters / getters
  ```typescript
  setSavePath(path: string): string;
  getSavePath(): string;
  ``` 

---

## DONE