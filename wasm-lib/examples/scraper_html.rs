fn main() {
    let html = r#"
    <div id="div-root">
    <canvas id="canvas-content" style="height: 500px; width: 500px;"></canvas>
    </div>
"#;

    let document = scraper::Html::parse_document(html);
    let selector = scraper::Selector::parse("body").unwrap();
    document
        .select(&selector)
        .next()
        .map(|ele| {
            println!("ele: {:?}", ele.text());
        })
        .unwrap();
}
