import pandas as pd


def build_hierarchical_dataframe(df, levels, value_column, color_columns):
    """
    Build a hierarchy of levels for Sunburst or Treemap charts.

    Levels are given starting from the bottom to the top of the hierarchy,
    ie the last level corresponds to the root.
    """
    df_all_trees = pd.DataFrame(columns=['label', 'parent', 'value', 'color'])
    for i, level in enumerate(levels):
        df_tree = pd.DataFrame(columns=['label', 'parent', 'value', 'color'])        
        dfg = df.groupby(levels[i:]).agg(
            {color_columns: ['mean'], value_column: ['sum']}).reset_index()
        df_tree['label'] = dfg[level].copy()
        df_tree['parent'] = dfg[levels[i+1]].copy() if i < len(levels) - 1 else 'total'
        df_tree['color'] = dfg[color_columns]
        df_tree['value'] = dfg[value_column]
        df_tree['level'] = level
        df_all_trees = df_all_trees.append(df_tree, ignore_index=True)
    total = pd.Series(dict(label='total',
                           parent='',
                           level='total',
                           value=df[value_column].sum(),
                           color=0))

    df_all_trees = df_all_trees.append(total, ignore_index=True)
    return df_all_trees
